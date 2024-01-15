import { Modal, Form, Input, Divider } from 'antd'
import { select_epic_modal, set_epic_modal_show } from '../../redux/slice/epic'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../util/http'
import { useParams } from 'react-router-dom'
import { get_project_async } from '../../redux/slice/project'

function CreateEpicModal() {
    const modal_show = useSelector(select_epic_modal)
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const params = useParams()
    const project_id = params.id

    function onCancel() {
        dispatch(set_epic_modal_show(false))
    }
    async function onOk() {
        const form_data = await form.validateFields()
        const epic_name = form_data.epic_name
        if (form_data) {
            await axios.post(`/api/epic/${project_id}`, {
                epic_name
            });
            
            dispatch(set_epic_modal_show(false))

            dispatch(get_project_async(project_id))
        }
    }
    return (
        <Modal
            title="创建 EPIC"
            open={modal_show}
            okText={'创建 EPIC'}
            onOk={onOk}
            onCancel={onCancel}
            cancelText="取消"
        >
            <Divider />
            <Form
                name="basic"
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Epic 名称"
                    name="epic_name"
                    rules={[{ required: true, message: '请输入Epic名称' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
            <Divider />

        </Modal>
    )
}

export default CreateEpicModal