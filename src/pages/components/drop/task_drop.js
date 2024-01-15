import { Draggable, Droppable } from "react-beautiful-dnd";
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { set_task_modal } from "../../../redux/slice/kanban";
function TaskDrop(props) {
    const dispatch = useDispatch()
    
    const task = props.task
    const list = task.task
    function edit_task(kanban_key, task_id) {
        dispatch(set_task_modal({
            kanban_key,
            task_id,
            show: true,
            type: 'edit'
        }))
    }
    return (
        <Droppable droppableId={task.kanban_key} type="task">
            {(provided, snapshot) => (
                <div
                    className="task_drop_wrap"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    {list.map((item, index) => (
                        <Draggable
                            key={`${task.kanban_key}_${item.name}`}
                            draggableId={`${task.kanban_key}_${item.name}`}
                            index={index}
                        >
                            {(provided, snapshot) => (
                                <div
                                    className="task_drag_wrap"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => {
                                        edit_task(task.kanban_key, item.task_id)
                                    }}
                                >
                                    <div className='task_card'>
                                        <div className='task_card_top'>
                                            <div className='task_head_picture' alt='' ></div>
                                            <div className='task_head-p'>{item.name}</div>
                                        </div>
                                        <div className='task_card_bottom'>
                                            <div className='task_owner'>{item.owner}</div>
                                            <div className={classnames({
                                                new_task_type: true,
                                                red: item.type === 'bug',
                                                blue: item.type === 'task'
                                            })}>
                                                <span className='task_type-span'>{item.type}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default TaskDrop