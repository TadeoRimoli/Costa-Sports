import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { FirebaseURL } from "@env"

export const profileApi = createApi({
    reducerPath:"profileApi",
    baseQuery:fetchBaseQuery({
        baseUrl:FirebaseURL,
    }),
    tagTypes:["userImage"],
    endpoints:(builder)=>({
        putImageProfile: builder.mutation({
            query: ({ image, localId }) => {
                return {
                    url: `/profile/${localId}.json`,
                    method: "PUT",
                    body: { image }
                };
            },
            invalidatesTags:["userImage"]
        }),
        getImageProfile:builder.query({
            query:(localId) => `/profile/${localId}.json`,
            providesTags:["userImage"]
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