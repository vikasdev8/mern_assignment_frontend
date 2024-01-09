import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apis = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:80/'}),
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (body) => ({
        method:"post",
        url:"user",
        body
      })
    }),
    login: builder.mutation({
      query: (body) => ({
        method:"post",
        url:"login",
        body
      })
    })
  }),
})

export const {useCreateMutation,useLoginMutation} = apis