import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    task_modal_status: {
        show: false,
        kanban_key: '',
        task_id: '',
        type: 'create' // create || edit
    },
    current_project: {}
}

const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        set_current_project: (state, action) => {
            state.current_project = action.payload
        },
        set_task_modal: (state, action) => {
            Object.keys(action.payload).forEach(key => {
                state.task_modal_status[key] = action.payload[key]
            })
        }
    }
})

export const select_task_modal_status = (state) => { // 获取task内的初始值
    return state.kanban.task_modal_status
}

export const select_task_modal_show = (state) => { // 获取task弹窗显示状态
    return state.kanban.task_modal_status.show
}

export const select_current_project = (state) => { // 获取当前的单一project对象
    return state.kanban.current_project
}
export const select_epic_list = (state) => {
    return state.kanban.current_project.epic
}
export const { set_current_project, set_task_modal } = kanbanSlice.actions
export default kanbanSlice.reducer