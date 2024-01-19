import { Modal, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_project_list_async, select_project_list, select_project_modal, set_project_modal } from '../../redux/slice/project';
import axios from '../../util/http'
import useSelectOptions from '../hooks/useSelectOptions';

function CreateProjectModal() {
    const dispatch = useDispatch()
    const { orgs_options, users_options } = useSelectOptions()

    const modal_data = useSelector(select_project_modal)
    const project_list = useSelector(select_project_list)

    const [form] = Form.useForm();

    const show = modal_data.show
    const type = modal_data.type
    const project_id = modal_data.id

    useEffect(() => {
        if (type === 'edit' && show) {
            const data = project_list.find((item) => {
                return item._id === project_id
            })
            const form_data = {
                name: data.name,
                organization: data.organization,
                owner: data.owner
            }
            form.setFieldsValue(form_data)
        }
        if (type === 'create' && show) {
            form.resetFields()
        }
    }, [show])


    async function handleOk() {
        const form_data = await form.validateFields();
        if (form_data) {
            if (type === 'create') {
                await axios.post('/api/projects', form_data)
            }
            if (type === 'edit') {
                await axios.put(`/api/projects/${project_id}`, form_data)
            }
            dispatch(set_project_modal({
                show: false
            }))
            dispatch(get_project_list_async())
        }
    }
    const handleCancel = () => {
        dispatch(set_project_modal({
            show: false
        }))
    };
    return (
        <Modal
            title={type === 'edit' ? '编辑项目' : '创建项目'}
            open={show}
            okText={type === 'edit' ? '编辑项目' : '创建项目'}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText="取消"
        >
            <Form
                name="basic"
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="项目名称"
                    name="name"
                    rules={[{ required: true, message: '请输入项目名称' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="所在部门"
                    name="organization"
                    rules={[{ required: true, message: '请选择部门' }]}
                >
                    <Select
                        options={orgs_options}
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    label="主负责人"
                    name="owner"
                    rules={[{ required: true, message: '请选择主负责人' }]}
                >
                    <Select
                        options={users_options}
                    >
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateProjectModal