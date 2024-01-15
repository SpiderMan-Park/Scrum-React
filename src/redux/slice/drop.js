import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateProjectService } from '../../api/project'
const initialState = {
    kanban_data: [],
    project_id: ''
}

export const update_kanban_async = createAsyncThunk(
    'drop/update', async (action, state) => {
        const store = state.getState()
        const kanban_data = store.drop.kanban_data
        const project_id = store.drop.project_id
        await updateProjectService(project_id, kanban_data)
    }
)

function reorderList(list, startIndex, endIndex) {
    const result = list
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}
export const DropSlice = createSlice({
    name: 'drop',
    initialState,
    reducers: {
        set_kanban_data: (state, action) => {
            state.kanban_data = action.payload
        },
        set_project_id: (state, action) => {
            state.project_id = action.payload
        },
        // 外层面板drop
        kanban_order: (state, action) => {
            reorderList(
                state.kanban_data,
                action.payload.source,
                action.payload.destination
            )
        },
        task_same_order: (state, action) => {
            const kanban = state.kanban_data.find(item => {
                return item.kanban_key === action.payload.kanban_key
            })
            reorderList(
                kanban.task,
                action.payload.source,
                action.payload.destination
            )
        },
        task_diff_order: (state, action) => {
            const source_key = state.kanban_data.find(item => {
                return item.kanban_key === action.payload.source_key
            })
            const destination_key = state.kanban_data.find(item => {
                return item.kanban_key === action.payload.destination_key
            })
            const source_task = source_key.task
            const destination_task = destination_key.task

            let result_source = source_task[action.payload.source]
            source_task.splice(action.payload.source, 1)
            destination_task.splice(action.payload.destination, 0, result_source)
        },
        add_kanban: (state, action) => {
            const kanban_key = action.payload.kanban_key
            state.kanban_data.push({
                kanban_key,
                task: []
            })
        },
        add_task: (state, action) => {
            const kanban_key = action.payload.kanban_key
            const task_data = action.payload.task
            const kanban = state.kanban_data.find(item => {
                return item.kanban_key === kanban_key
            })
            kanban.task.push(task_data)
        },
        update_task: (state, action) => {
            const kanban_key = action.payload.kanban_key
            let task_data = action.payload.task
            const task_id = action.payload.task_id

            const kanban = state.kanban_data.find(item => {
                return item.kanban_key === kanban_key
            })

            const index = kanban.task.findIndex(item => {
                return item.task_id === task_id
            })

            task_data.task_id = kanban.task.task_id
            kanban.task[index] = task_data
        }
    }
})

export const kanban_selector = (state) => {
    return state.drop.kanban_data
}

export const { set_project_id, set_kanban_data, kanban_order, task_same_order, task_diff_order, add_kanban, add_task, update_task } = DropSlice.actions
export default DropSlice.reducer