import { Divider, List, Popover, Typography } from 'antd'

function UserPopover() {
    let content = (
        <div className='project_create'>
            <Typography.Text type='secondary'>成员列表</Typography.Text>
            <List>
                <List.Item className='user_listItem'>
                    <p>A</p>
                </List.Item>
                <List.Item className='user_listItem'>
                    <p>B</p>
                </List.Item>
                <List.Item className='user_listItem'>
                    <p>C</p>
                </List.Item>
            </List>
        </div>
    )
    return (
        <Popover placement='bottom' content={content}>
            <h2 className='project_popover'>成员</h2>
        </Popover>
    )
}

export default UserPopover