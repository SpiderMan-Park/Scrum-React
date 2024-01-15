import SearchForm from "./components/search_form"
import { Space } from 'antd';
import DropCp from "./components/drop";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { get_project_async } from "../redux/slice/project";
import { set_project_id } from "../redux/slice/drop";
import CreateTaskModal from "./components/create_task_modal";

function Kanban() {

    const dispatch = useDispatch()
    const params = useParams()
    const project_id = params.id

    useEffect(() => {

        dispatch(get_project_async(project_id))
        dispatch(set_project_id(project_id))
    }, [params.id])
    return (
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <div>
                <h1 className="kanban_title">Scrum敏捷项目管理研发看板</h1>
            </div>
            <SearchForm />
            <div className="drop_wrap">
                <DropCp />
            </div>
            <CreateTaskModal />
        </Space>
    )
}

export default Kanban