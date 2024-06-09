import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IMetadata } from "./types"

const songsApi = createApi({
    reducerPath: 'songsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BACKEND_URL, prepareHeaders: (headers) => { headers.set('Accept', 'application/json') } }),
    endpoints: (builder) => ({
        getPoints: builder.query<number, string>({
            query: (uuid) => ({
                url: '/points',
                params: {
                    uuid
                },
            }),
            transformResponse: (res: { points: number }) => {
                return res.points
            }
        }),
        getListeningTimes: builder.query<any, void>({
            query: () => ({
                url: `/listening-times`,
            })
        }),
        getMetadata: builder.query<IMetadata[], void>({
            query: () => ({
                url: '/metadata'
            })
        }),
        nowPlaying: builder.query<IMetadata, void>({
            query: () => ({
                url: '/now-playing'
            })
        }),
    })
})

export default songsApi

export const {
    useGetListeningTimesQuery,
    useGetMetadataQuery,
    useGetPointsQuery,
    useNowPlayingQuery
} = songsApi