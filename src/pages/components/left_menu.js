import { Menu } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FundOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
function getItem(label, key, icon) {
    return {
        label,
        key,
        icon
    }
}

const items = [
    getItem('看板', 'kanban', <FundOutlined style={{ fontSize: '16px' }} />),
    getItem('任务组', 'epic', <OrderedListOutlined style={{ fontSize: '16px' }} />),
]

function LeftMenu() {
    const location = useLocation()
    const [active, set_active] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    const pathname = location.pathname;
    const key_arr = pathname.split('/')

    useEffect(() => {
        set_active(key_arr[3])
    }, [key_arr])

    function menu_click(e) {
        const key = e.key;
        set_active(key)
        const id = params.id
        navigate(`/project/${id}/${key}`)
    }

    return (
        <Menu
            onClick={menu_click}
            selectedKeys={active}
            mode={'inline'}
            items={items}
        />
    )
}

export default LeftMenu

