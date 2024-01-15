import { Divider, List, Popover, Typography } from 'antd'
function ProjectPopover() {
    let content = (
        <div className='project_create'>
            <Typography.Text type='secondary'>收藏项目</Typography.Text>
            <List>
                <List.Item className='project_listItem'>
                    <p>项目1</p>
                </List.Item>
                <List.Item className='project_listItem'>
                    <p>项目2</p>
                </List.Item>
                <List.Item className='project_listItem'>
                    <p>项目3</p>
                </List.Item>
            </List>
            <Divider style={{margin:'0 0 14px 0'}}/>
            <div className='project_create_name'>
                创建项目
            </div>
        </div>
    )
    return (
        <Popover placement='bottom' content={content}>
            <h2 className='project_popover'>收藏项目</h2>
        </Popover>
    )
}

export default ProjectPopover