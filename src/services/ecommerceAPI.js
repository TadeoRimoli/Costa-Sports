import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { FirebaseURL } from "../Constants/Constants"

export const ecommerceAPI = createApi({
    reducerPath:"ecommerceAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:FirebaseURL,
        prepareHeaders: (headers, { getState }) => {
        //     const state = getState();
        //     const authToken = state.General.user.idToken;
      
        //     if (authToken) {
        //       headers.set("Authorization", `Bearer ${authToken}`);
        //     }
      
        //     return headers;
          },
    }),
    endpoints:(buidler)=>({
        getProducts:buidler.query({
            query:()=>'/products.json',
            transformResponse:(response)=>{
                const data = Object.values(response)
                return data
            }
        }),
        getProductsByCategory:buidler.query({
            query:(category)=>`/products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse:(response)=>{
                const data = Object.values(response)
                return data
            }
        }),
        getProductsByCategoryOrderByPrice: buidler.query({
            query: (category) => `/products.json?orderBy="category"&equalTo="${category}"&orderBy="price"`, // Agregamos orderBy="price"
            transformResponse: (response) => {
                const data = Object.values(response);
                return data;
            },
        }),
        getCategories:buidler.query({
            query:()=>'/categories.json'
        }),
        postOrder:buidler.mutation({
            query:({...order})=>({
                url:'/orders.json',
                method:"POST",
                body:order
            })
        }),
        getOrders:buidler.mutation({
            query:(user)=>({
                url:`/orders.json?orderBy="user"&equalTo="${user}"`,
                method:"GET",
            })
        }),
        reduceProductStock: buidler.mutation({
            
            query: ({ productId, amount }) => {
                console.log("productId: ", productId,"amount: ", amount)
                return ({
              url: `/products/${productId}.json`,
              method: "PATCH",
              body: { stock: amount }, // Reducir el stock en la cantidad especificada
            })},
            // transformResponse:(response)=>{
            //     console.log(response)
            //     return response;
            // }
        })
    })
})

export const {useLazyGetProductsByCategoryQuery,useGetCategoriesQuery,useGetProductsQuery,useGetProductsByCategoryQuery,usePostOrderMutation,useGetOrdersMutation,useReduceProductStockMutation} = ecommerceAPI