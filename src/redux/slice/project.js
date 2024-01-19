import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getOrgsService, getProjectListService, getProjectService, getTaskTypeService, getUsersService } from '../../api/project'
import { set_kanban_data } from './drop'
import { set_current_project } from './kanban'
import axios from '../../util/http'
const initialState = {
    list: [],
    loading: false,
    users: [],
    organizations: [],
    task_types: [],
    total: 0,
    current_page: 1,
    project_modal: {
        show: false,
        type: 'create',
        id: ''
    },
    search_query: {}
}

export const get_project_list_async = createAsyncThunk(
    'project/get_project_list', async (data, store) => {
        const state = store.getState()
        const skip = (state.project.current_page - 1) * 10;
        const search_query = state.project.search_query

        const res = await axios.post('/api/projects/search', {
            ...search_query,
            skip
        });
        return res.data;
    }
)
export const get_project_async = createAsyncThunk(
    'project/get_project', async (action, state) => {
        const res = await getProjectService(action)
        const kanban = res.data.data.kanban
        // 拉取kanban最新数据
        state.dispatch(set_kanban_data(kanban))
        // project激活状态保留，备用
        state.dispatch(set_current_project(res.data.data))

        return kanban
    }
)

export const get_users_async = createAsyncThunk(
    'project/get_users', async () => {
        const res = await getUsersService()
        return res.data
    }
)
export const get_org_async = createAsyncThunk(
    'project/get_org', async () => {
        const res = await getOrgsService()
        return res.data
    }
)
export const get_task_type_async = createAsyncThunk(
    'project/get_task_type', async () => {
        const res = await getTaskTypeService()
        return res.data
    }
)

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        change_list: (state, action) => {
            const { _id, data } = action.payload
            const index = state.list.findIndex(item => {
                return item.id === _id
            })
            state.list[index] = data
        },
        set_current_page: (state, action) => {
            state.current_page = action.payload
        },
        set_project_modal: (state, action) => {
            state.project_modal = {
                ...state.project_modal,
                ...action.payload
            }
        },
        set_search_query: (state, action) => {
            state.search_query = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(get_project_list_async.pending, (state, res) => {
            state.loading = true
        })
        builder.addCase(get_project_list_async.fulfilled, (state, res) => {
            const data = res.payload.data.data
            const total = res.payload.data.total;
            data.forEach(item => {
                if (typeof item.collect === 'undefined') {
                    item.collect = false
                }
            });
            state.list = data
            state.loading = false
            state.total = total
        })
        builder.addCase(get_users_async.fulfilled, (state, res) => {
            state.users = res.payload.data
        })
        builder.addCase(get_org_async.fulfilled, (state, res) => {
            state.organizations = res.payload.data
        })
        builder.addCase(get_task_type_async.fulfilled, (state, res) => {
            state.task_types = res.payload.data
        })
    }
})

export const select_project_list_loading = (state) => {
    return state.project.loading
}

export const select_project_list = (state) => {
    return state.project.list
}
export const select_users = (state) => {
    return state.project.users
}
export const select_orgs = (state) => {
    return state.project.organizations
}
export const select_task_types = (state) => {
    return state.project.task_types
}

export const select_project_list_data = (state) => {
    return {
        list: state.project.list,
        current_page: state.project.current_page,
        total: state.project.total
    }
}
export const select_project_modal = (state) => {
    return state.project.project_modal
}

export const { change_list, set_current_page, set_project_modal, set_search_query } = projectSlice.actions

export default projectSlice.reducer
