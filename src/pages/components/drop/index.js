import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../../css/drop.css";
import { Input, Button } from 'antd'
import TaskDrop from "./task_drop";
import { useSelector, useDispatch } from 'react-redux'
import { kanban_order, task_same_order, kanban_selector, task_diff_order, update_kanban_async, add_kanban } from "../../../redux/slice/drop";
import { set_task_modal } from "../../../redux/slice/kanban";
import { useState, useEffect, useTransition } from "react";
function DropCp(props) {
    const dispatch = useDispatch()
    console.log('DropCp render');
    const count = props.drop_test_data.count
    const drag_data = useSelector(kanban_selector)
    // const [drag_data, set_drag_data] = useState([])
    // const [isPending, startTransition] = useTransition()
    // 模拟数据量大
    // useEffect(() => {
    //     startTransition(() => {
    //         let data = []
    //         for (let i = 0; i < 100; i++) {
    //             let task = []
    //             for (let j = 0; j < 30; j++) {
    //                 task.push({
    //                     name: `${i}_${j}`,
    //                     owner: `${i}_${j}`,
    //                     type: 'bug'
    //                 })
    //             }
    //             data.push({
    //                 kanban_key: `${i}`,
    //                 task
    //             })
    //         }
    //         set_drag_data(data)
    //     })
    // }, [])




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
                                                    count:{count}
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
const DropCpMemo = React.memo(DropCp)
export default DropCpMemo;

/**
 * 看板拖拽页面较为复杂，我们的用户量也很大，task数量多，
 * 渲染会有性能问题，使用react.memo，usememo，usecallback优化了更新性能，
 * 造成这种原因是因为父组件的更新导致了子组件的重新渲染，要抓主要矛盾
 * 哪里有性能瓶颈就优化哪里，而不是全部优化
 */