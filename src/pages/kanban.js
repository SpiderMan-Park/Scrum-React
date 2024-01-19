import { useEffect, useState, useCallback, useMemo } from "react";
import SearchForm from "./components/search_form"
import { Space } from 'antd';
import DropCp from "./components/drop";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { get_project_async } from "../redux/slice/project";
import { set_kanban_data, set_project_id } from "../redux/slice/drop";
import CreateTaskModal from "./components/create_task_modal";
import { select_current_project } from "../redux/slice/kanban";

function Kanban() {
    console.log('kanban render');
    const dispatch = useDispatch()

    const params = useParams()
    const project_id = params.id
    const current_project = useSelector(select_current_project)

    const [search_params] = useSearchParams()
    const search_epic = search_params.get('epic')

    const [count, setCount] = useState(1)
    function add() {
        setCount(count + 1)
    }
    useEffect(() => {

        dispatch(get_project_async(project_id)).then((res) => {
            const kanban_arr = res.payload;

            if (search_epic) {
                const form_data = {
                    epic: search_epic
                }

                let fliter_drop_data = kanban_arr.map((item) => {
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
        })
        dispatch(set_project_id(project_id))
    }, [params.id])
    function some_event() {

    }
    const s_event = useCallback(some_event, [])

    // const drop_test_data = {
    //     count: 0
    // }
    const drop_test_data_memo = useMemo(() => {
        return {
            count: 0
        }
    }, [])
    return (
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <div>
                <h1 className="kanban_title">{current_project.name}-研发看板</h1>
                {count}
                <button onClick={add}>+1</button>
            </div>
            <SearchForm />
            <div className="drop_wrap">
                <DropCp drop_test_data={drop_test_data_memo} some_event={s_event} />
            </div>
            <CreateTaskModal />
        </Space>
    )
}

export default Kanban