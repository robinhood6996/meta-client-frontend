import {apiSlice} from '../apiSlice'

export const reportsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: () => ({
        url: '/report',
        method: 'GET',
      }),
      providesTags: ['getReportList'],
    }),
    getPendingReports: builder.query({
      query: () => ({
        url: '/report/pending',
        method: 'GET',
      }),
      providesTags: ['getPendingReportList'],
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: `/report/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getPendingReportList', 'getReportList'],
    }),
    updateReport: builder.mutation({
      query: ({id, suspicious}) => ({
        url: `/report/${id}`,
        method: 'PUT',
        body: {suspicious},
      }),
      invalidatesTags: ['getPendingReportList', 'getReportList'],
    }),
  }),
})

export const {
  useGetReportsQuery,
  useGetPendingReportsQuery,
  useDeleteReportMutation,
  useUpdateReportMutation,
} = reportsApi
