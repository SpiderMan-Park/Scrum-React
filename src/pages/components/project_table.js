import { Table, Space, Button, Pagination } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { change_list, get_project_list_async, select_project_list, select_project_list_data, set_current_page, set_project_modal } from '../../redux/slice/project'
import { NavLink } from 'react-router-dom';
import { store } from '../../redux/store'
import dayjs from 'dayjs'
import axios from '../../util/http'
const columns = [
    {
        title: '',
        dataIndex: 'collect',
        key: 'collect',
        render: (text, record) => {
            return (
                <HeartFilled onClick={() => { hand_collect_click(record) }} style={{ color: text ? '#f60' : '#ccc' }} />
            )
        },
        width: '5%'
    },
    {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, data) => {
            // console.log(text, data)
            return <NavLink to={`/project/${data._id}/kanban`}>{text}</NavLink>
        },
        sorter: (a, b) => a.title - b.title,
        width: '20%'
    },
    {
        title: '部门',
        dataIndex: 'organization',
        key: 'organization',
        width: '20%'
    },
    {
        title: '负责人',
        dataIndex: 'owner',
        key: 'owner',
        render: text => <div>{text}</div>,
        width: '20%'
    },
    {
        title: '创建时间',
        key: 'created',
        dataIndex: 'created',
        render: (_, record) => (
            <Space size="middle">
                <div>{dayjs(record.created).format('YYYY-MM-DD')}</div>
            </Space>
        ),
    },
    {
        title: '操作',
        key: 'created',
        dataIndex: 'created',
        render: (_, record) => (
            <Space>
                <Button type='primary' onClick={() => {
                    edit_click(record._id)
                }}>编辑</Button>
                <Button type='primary' danger onClick={() => {
                    del_click(record._id)
                }}>删除</Button>

            </Space>
        ),
    },
];
function hand_collect_click(record) {
    const data = {
        ...record,
        collect: !record.collect
    }
    const dispatch = store.dispatch
    dispatch(change_list({
        _id: record._id,
        data
    }))
    axios.put(`/api/projects/${record._id}`, {
        collect: data.collect
    })
    store.dispatch(get_project_list_async())
}
function edit_click(id) {
    store.dispatch(set_project_modal({
        show: true,
        type: "edit",
        id
    }))
}
async function del_click(id) {
    await axios.delete(`/api/projects/${id}`)
    store.dispatch(get_project_list_async())
}
function ProjectTable() {
    const dispatch = useDispatch()
    const data = useSelector(select_project_list_data, shallowEqual)
    function onChange(page) {
        dispatch(set_current_page(page))
        dispatch(get_project_list_async())
    }
    return (
        <>
            <Table rowKey={'created'} pagination={false} className='project_table_css' columns={columns} dataSource={data.list} />
            <Pagination
                onChange={onChange}
                total={data.total}
                current={data.current_page}
            />
        </>
    )
}


export default ProjectTable


