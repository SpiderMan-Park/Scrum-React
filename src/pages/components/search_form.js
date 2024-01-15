import { Input, Select, Space, Form, Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom';
import { searchProjectService } from '../../api/project';
import { set_kanban_data } from '../../redux/slice/drop';
import { select_epic_list } from '../../redux/slice/kanban';
import { select_task_types, select_users } from '../../redux/slice/project';

function SearchForm() {
    const dispatch = useDispatch()
    const [search_params] = useSearchParams()
    const [form] = Form.useForm()
    const search_epic = search_params.get('epic')
    const users = useSelector(select_users)
    const task_types = useSelector(select_task_types)
    const epic = useSelector(select_epic_list) || []
    const params = useParams()
    const project_id = params.id

    useEffect(() => {
        if (search_epic) {
            form.setFieldValue('epic', search_epic)
            setTimeout(() => {
                search({
                    epic: search_epic
                })
            }, 500)
        }
    }, [])


    async function search(form_data) {
        const res = await searchProjectService(project_id)
        let drop_data = res.data.data.kanban
        let fliter_drop_data = drop_data.map((item) => {
            let task_list = item.task;
            task_list = task_list.filter((task) => {
                let isName = true;
                let isType = true;
                let isOwner = true;
                let isEpic = true;

                if (form_data.name) {
                    if (task.name.indexOf(form_data.name) < 0) {
                        isName = false
                    }
                }
                if (form_data.owner) {
                    if (task.owner !== form_data.owner) {
                        isOwner = false
                    }
                }
                if (form_data.type) {
                    if (task.type !== form_data.type) {
                        isType = false
                    }
                }

                if (form_data.epic) {
                    if (task.epic !== form_data.epic) {
                        isEpic = false
                    }
                }

                return isName && isType && isOwner && isEpic
            })
            return {
                ...item,
                task: task_list
            }
        })
        dispatch(set_kanban_data(fliter_drop_data))
    }

    async function search_click() {
        const form_data = await form.validateFields();
        if (form_data) {
            await search(form_data)
        }
    }
    function render_task_options(arr) {
        return arr.map(item => {
            return <Select.Option key={item.type} value={item.type}>{item.name}</Select.Option>
        })
    }
    function render_users_options(arr) {
        return arr.map(item => {
            return <Select.Option key={item.username} value={item.username}>{item.username}</Select.Option>
        })
    }
    function reset() {
        form.resetFields()
    }
    const epic_options = epic.map((key) => {
        return {
            value: key,
            label: key
        }
    })
    return (
        <Form form={form}>
            <Space direction="horizontal" size={'large'}>
                <Form.Item name="name">
                    <Input placeholder='任务名' />
                </Form.Item>
                <Form.Item label="主负责人：" name="owner">
                    <Select
                        style={{ width: 140 }}
                    >
                        {render_users_options(users)}
                    </Select>
                </Form.Item>
                <Form.Item label="任务类型：" name="type">
                    <Select
                        style={{ width: 140 }}
                    >
                        {render_task_options(task_types)}
                    </Select>
                </Form.Item>
                <Form.Item label="epic：" name="epic">
                    <Select
                        style={{ width: 140 }}
                        options={epic_options}
                    />
                </Form.Item>
                <Form.Item>
                    <Button onClick={reset}>重置</Button>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' onClick={search_click}>查询</Button>
                </Form.Item>
            </Space>
        </Form >
    )
}

export default SearchForm