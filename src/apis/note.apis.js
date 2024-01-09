import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apis = createApi({
  reducerPath: 'notes',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:80/',prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }, }),
  tagTypes:['notes'],
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (body) => ({
        method:"post",
        url:"note",
        body,
      }),
      invalidatesTags:['notes']
    }),
    update: builder.mutation({
      query: ({data,_id}) => {
        return ({
        method:"put",
        url:`note/${_id}`,
        body:data
        })
      },
      invalidatesTags:['notes']
    }),
    delete: builder.mutation({
      query: (id) => ({
        url:`note/${id}`,
        method:"delete",
      }),
      invalidatesTags:['notes']
    }),
    allnotes: builder.query({
      query: () => ({
        method:'get',
        url:"note",
      }),
      providesTags:['notes']
    }),
  }),
})

export const {useAllnotesQuery,useCreateMutation,useDeleteMutation,useUpdateMutation} = apis