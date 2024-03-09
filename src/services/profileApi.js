import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { FirebaseURL } from "../Constants/Constants"

export const profileApi = createApi({
    reducerPath:"profileApi",
    baseQuery:fetchBaseQuery({
        baseUrl:FirebaseURL,
    }),
    endpoints:(builder)=>({
        putImageProfile: builder.mutation({
            query: ({ image, localId }) => {
                return {
                    url: `/profile/${localId}.json`,
                    method: "PUT",
                    body: { image }
                };
            },
        }),
        getImageProfile:builder.query({
            query:(localId) => `/profile/${localId}.json`
        }),
        putUserLocation:builder.mutation({
            query:({localId,locationFormatted})=> ({
                url:`/userLocation/${localId}.json`,
                method:"PUT",
                body:locationFormatted

            })
        }),
        getUserLocation:builder.query({
            query:(localId) => `/userLocation/${localId}.json`
        })
    })
})

export const {usePutImageProfileMutation,useGetImageProfileQuery,useGetUserLocationQuery,usePutUserLocationMutation} = profileApi