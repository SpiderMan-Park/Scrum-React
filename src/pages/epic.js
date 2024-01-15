import EpicList from "./components/epic_list"
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { get_project_async } from "../redux/slice/project"
import { set_project_id } from "../redux/slice/drop"
import CreateEpicModal from "./components/create_epic_modal"
import { set_epic_modal_show } from "../redux/slice/epic"

function Epic() {
    const dispatch = useDispatch()
    const params = useParams()
    const project_id = params.id
    
    function create_epic() {
        dispatch(set_epic_modal_show(true))
    }
    useEffect(() => {

        dispatch(get_project_async(project_id))
        dispatch(set_project_id(project_id))
    }, [params.id])
    return (
        <div className="epic_body">
            <div className="epic_title">
                <button className="epic_title_button" onClick={create_epic}>创建任务组</button>
            </div>
            <EpicList />
            <CreateEpicModal />
        </div>
    )
}

export default Epic