import { Input, Select, Form, Button, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { get_project_list_async, select_orgs, select_users, set_current_page, set_search_query } from '../../redux/slice/project';
function ProjectSearch() {
    const dispatch = useDispatch()

    const orgs = useSelector(select_orgs)
    const users = useSelector(select_users)

    const [form] = Form.useForm();
    function reset() {
        form.resetFields()
    }
    async function search_click() {
        const form_data = await form.validateFields()
        if (form_data) {
            dispatch(set_search_query(form_data))
            dispatch(set_current_page(1))
            dispatch(get_project_list_async())
        }
    }
    const orgs_option = orgs.map(item => {
        return {
            value: item.name,
            label: item.name
        }
    })
    const users_option = users.map(item => {
        return {
            value: item.username,
            label: item.username
        }
    })
    return (
        <Form layout="inline" form={form} >
            <Space direction="horizontal" size={'large'}>
                <Form.Item
                    name="name"
                    style={{ width: 200 }}
                >
                    <Input placeholder={'任务名'} />
                </Form.Item>
                <Form.Item
                    label="部门"
                    name="organization"

                    style={{ width: 200 }}
                >
                    <Select
                        options={orgs_option}
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    label="主负责人"
                    name="owner"
                    style={{ width: 200 }}
                >
                    <Select
                        options={users_option}
                    >
                    </Select>
                </Form.Item>
                <Button onClick={reset} type="default">重置</Button>
                <Button onClick={search_click} type="primary">查询</Button>
            </Space>
        </Form>
    )
}

export default ProjectSearch