import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

const createDefaultState = () => {
    const existing = localStorage.getItem('uuid')
    if (!existing) {
        return uuidv4()
    }
    return existing
}

const uuidSlice = createSlice({
    initialState: createDefaultState(),
    name: 'uuid',
    reducers: {

    },
    selectors: {
        getUUID: (state) => {
            return state
        }
    }
})

export default uuidSlice.reducer
export const { getUUID } = uuidSlice.selectors