import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../../css/drop.css";
import { Input, Button } from 'antd'
import TaskDrop from "./task_drop";
import { useSelector, useDispatch } from 'react-redux'
import { kanban_order, task_same_order, kanban_selector, task_diff_order, update_kanban_async, add_kanban } from "../../../redux/slice/drop";
import { set_task_modal } from "../../../redux/slice/kanban";
function DropCp() {
    const drag_data = useSelector(kanban_selector)
    const dispatch = useDispatch()

    function input_keydown(e) {
        const value = e.target.value.trim()
        if (!value) {
            return
        }
        dispatch(add_kanban({
            kanban_key: value
        }))
        dispatch(update_kanban_async())
    }

    function new_task_click(kanban_key) {
        dispatch(set_task_modal({
            show: true,
            kanban_key,
            type: 'create'
        }))
    }

    function onDragEnd(result) {
        if (!result.destination) {
            return
        }
        if (result.type === 'kanban') {
            dispatch(kanban_order({
                source: result.source.index,
                destination: result.destination.index
            }))
            dispatch(update_kanban_async()) // 拖拽看板同步接口状态
        }
        if (result.type === 'task') {
            if (result.source.droppableId === result.destination.droppableId) {
                dispatch(task_same_order({
                    kanban_key: result.destination.droppableId,
                    source: result.source.index,
                    destination: result.destination.index
                }))
                dispatch(update_kanban_async())

            } else {
                dispatch(task_diff_order({
                    source_key: result.source.droppableId,
                    destination_key: result.destination.droppableId,
                    source: result.source.index,
                    destination: result.destination.index
                }))
                dispatch(update_kanban_async())
            }
        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                direction="horizontal"
                droppableId="droppable-xxx"
                type="kanban"
            >
                {(provided, snapshot) => {
                    return (
                        <div
                            className="kanban_drop_wrap"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                        >
                            {drag_data.map((item, index) => {
                                return (
                                    <Draggable
                                        key={item.kanban_key}
                                        draggableId={item.kanban_key}
                                        index={index}
                                    >
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    className="kanban_drag_wrap"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <h1 className="kanban_drag_title">{item.kanban_key}</h1>
                                                    <TaskDrop task={item} />
                                                    <Button className="new_task_btn" type="primary" onClick={() => {
                                                        new_task_click(item.kanban_key)
                                                    }}>
                                                        新建task
                                                    </Button>
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
            <div className='kanban_drag_wrap'>
                <Input style={{ width: '280px' }} placeholder="新建看板名称" onPressEnter={input_keydown} />
            </div>
        </DragDropContext>
    );
}

export default DropCp;
