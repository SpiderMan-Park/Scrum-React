import { Modal, Form, Input, Select, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { select_epic_list, select_task_modal_status, set_task_modal } from '../../redux/slice/kanban';
import { add_task, kanban_selector, update_kanban_async, update_task } from '../../redux/slice/drop';
import { useEffect } from 'react';
import useSelectOptions from '../hooks/useSelectOptions';

function CreateTaskModal() {
    const { show, type, kanban_key, task_id } = useSelector(select_task_modal_status)

    const dispatch = useDispatch()
    const { task_options, users_options } = useSelectOptions()

    const [form] = Form.useForm();

    const kanban_data = useSelector(kanban_selector)
    const epic = useSelector(select_epic_list) || []
    useEffect(() => {
        if (type === 'edit' && show) {
            const data = kanban_data
            const kanban = data.find((item) => {
                return item.kanban_key === kanban_key
            })
            const task_data = kanban.task;
            const task = task_data.find((item) => {
                return item.task_id === task_id
            })
            // 设置表单
            form.setFieldsValue(task)
        }
        if (type === 'create' && show) {
            // 清理掉
            form.resetFields()
        }
    }, [show])

    async function handleOk() {
        const form_data = await form.validateFields()
        if (form_data) {
            // 创建
            if (type === 'create') {
                form_data.task_id = Math.random().toString(32).substring(2)
                dispatch(add_task({
                    kanban_key,
                    task: form_data
                }))
                // 更新kanban
                dispatch(update_kanban_async())
            }

            // 编辑
            if (type === 'edit') {
                dispatch(update_task({
                    task: form_data,
                    task_id,
                    kanban_key
                }))
                // 更新kanban
                dispatch(update_kanban_async())
            }
            dispatch(set_task_modal({
                show: false
            }))
        }
    }
    const handleCancel = () => {
        dispatch(set_task_modal({
            show: false
        }))
    };
    const epic_options = epic.map((key) => {
        return {
            value: key,
            label: key
        }
    })
    return (
        <Modal
            open={show}
            title={type === 'create' ? '创建任务' : '修改任务'}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={type === 'create' ? '创建' : '修改'}
            cancelText="取消"
        >
            <Divider />
            <Form form={form}>
                <Form.Item
                    label="任务名称"
                    name="name"
                    rules={[{ required: true, message: "请输入任务名称" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="任务类型"
                    name="type"
                    rules={[{ required: true, message: "请选择任务类型" }]}
                >
                    <Select
                        options={task_options}
                    />
                </Form.Item>
                <Form.Item
                    label="主负责人"
                    name="owner"
                    rules={[{ required: true, message: "请选择主负责人" }]}
                >
                    <Select
                        options={users_options}
                    />
                </Form.Item>
                <Form.Item
                    label="epic"
                    name="epic"
                    rules={[{ message: "请选择epic" }]}
                >
                    <Select
                        options={epic_options}
                    />
                </Form.Item>
            </Form>
            <Divider />
        </Modal>
    )
}

export default CreateTaskModal