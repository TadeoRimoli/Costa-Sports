import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { FirebaseURL } from "../Constants/Constants"

export const profileApi = createApi({
    reducerPath:"profileApi",
    baseQuery:fetchBaseQuery({
        baseUrl:FirebaseURL,
    }),
    endpoints:(buidler)=>({
        postImageProfile:buidler.mutation({
            query:({image,localId})=>({
                uri:`profileImages/${localId}.json`,
                method:'PUT',
                body: {
                    image:image
                }
            })
        }),
        getImageProfile:buidler.query({
            query:({localId})=>({
                uri:`profile/${localId}.json`,
                method:'GET',
            })
        }),
    })
})

export const {usePostImageProfileMutation,useGetImageProfileQuery} = profileApi