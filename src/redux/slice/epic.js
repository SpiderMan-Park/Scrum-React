import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    modal_show: false
}

const epicSlice = createSlice({
    name: 'epic',
    initialState,
    reducers: {
        set_epic_modal_show: (state, action) => {
            state.modal_show = action.payload
        }
    }
})

export const select_epic_modal = (state) => {
    return state.epic.modal_show
}

export const { set_epic_modal_show } = epicSlice.actions

export default epicSlice.reducer