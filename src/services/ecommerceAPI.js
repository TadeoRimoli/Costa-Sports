import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { FirebaseURL } from "../Constants/Constants"

export const ecommerceAPI = createApi({
    reducerPath:"ecommerceAPI",
    baseQuery:fetchBaseQuery({baseUrl:FirebaseURL}),
    endpoints:(buidler)=>({
        getProducts:buidler.query({
            query:()=>'products.json',
            transformResponse:(response)=>{
                const data = Object.values(response)
                return data
            }
        }),
        getProductsByCategory:buidler.query({
            query:(category)=>`products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse:(response)=>{
                const data = Object.values(response)
                return data
            }
        }),
        getCategories:buidler.query({
            query:()=>'categories.json'
        }),
        postOrder:buidler.mutation({
            query:({...order})=>({
                url:'orders.json',
                method:"POST",
                body:order
            })
        }),
        getOrders:buidler.mutation({
            query:()=>({
                url:'orders.json',
                method:"GET",
            })
        })
    })
})

export const {useGetCategoriesQuery,useGetProductsQuery,useGetProductsByCategoryQuery,usePostOrderMutation,useGetOrdersMutation} = ecommerceAPI