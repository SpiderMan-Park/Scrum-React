import { List } from 'antd'
import { useSelector } from 'react-redux'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { select_epic_list } from '../../../redux/slice/kanban'
import DeleteAlert from './delete_alert'

function EpicList() {
    const epic_list = useSelector(select_epic_list)
    const navigate = useNavigate()
    const params = useParams()
    function epic_detail(epic) {
        navigate({
            pathname: `/project/${params.id}/kanban`,
            search: createSearchParams({
                epic
            }).toString()
        })
    }
    return (
        <List
            itemLayout="horizontal"
            dataSource={epic_list}
            renderItem={(item) => (
                <List.Item style={{ height: '135px' }}>
                    <List.Item.Meta
                        title={
                            <div className='list_item_title'>
                                <div onClick={() => {
                                    epic_detail(item)
                                }} style={{ fontSize: '18px', color: 'black' }}>{item}</div>
                                <DeleteAlert />
                            </div>
                        }
                        description={
                            <div style={{ fontSize: '16px' }}>
                                <div>开始时间：暂无</div>
                                <div>结束时间: 暂无</div>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

export default EpicList