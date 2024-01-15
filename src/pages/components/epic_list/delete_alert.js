import React from 'react'
import { Button, Modal, Space } from 'antd'
import axios from '../../../util/http'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { get_project_async } from '../../../redux/slice/project'

// 任务删除
export default function DeleteAlert() {
    const dispatch = useDispatch()
    const params = useParams()
    const project_id = params.id

    // /api/epic/:project_id
    const DeleteText = () => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除该项目组吗？',
            async onOk() {
                // const res = await axios.delete(`/api/epic/${project_id}`)
                // dispatch(get_project_async(project_id))

                // return mutateAsync({ id: kanban.id })
            },
        })
    }

    return (
        <Space>
            <Button onClick={DeleteText}>删除</Button>
        </Space>
    )
}
