import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { ApiKey, FirebaseURL } from "@env"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://identitytoolkit.googleapis.com/v1" }),
  endpoints: (builder) => ({
      signUp: builder.mutation({
          query: ({...auth}) => ({
              url: `/accounts:signUp?key=${ApiKey}`, 
              method: "POST",
              body: auth,
          }),
      }),
      login: builder.mutation({
          query: ({...auth}) => ({
              url: `/accounts:signInWithPassword?key=${ApiKey}`, 
              method: "POST",
              body: auth,
          }),
      }),
  })
});

export const { useLoginMutation, useSignUpMutation,useLogoutMutation,useDeleteAccountMutation } = authApi;