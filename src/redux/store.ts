import { configureStore } from '@reduxjs/toolkit'
import uuidSlice from './uuidSlice'
import songsApi from './songsApi'

export const store = configureStore({
    reducer: {
        uuid: uuidSlice,
        [songsApi.reducerPath]: songsApi.reducer
    },
    middleware: gdm => gdm().concat(songsApi.middleware)
})