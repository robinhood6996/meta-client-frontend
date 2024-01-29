import {objectToParam} from '../../../../helpers/objectParamsConversion'
import {apiSlice} from '../apiSlice'
// import {setAvailableCountries} from '../globalSearch'
// import {setIsLoggedOut, userLoggedIn, userLoggedOut} from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: (query) => ({
        url: `/payments?${objectToParam(query)}`,
        method: 'GET',
      }),
      providesTags: ['getPayments'],
    }),
    createAd: builder.mutation({
      query: (data) => ({
        url: '/project',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['getPayments'],
    }),
    editPayment: builder.mutation({
      query: ({paymentId, data}) => ({
        url: `/payments/${paymentId}`,
        method: 'PATCH',
        body: {...data},
      }),
      invalidatesTags: ['getPayments'],
    }),
    deletePayment: builder.mutation({
      query: (paymentId) => ({
        url: `/payments/${paymentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getPayments'],
    }),
  }),
})

export const {
  useGetPaymentsQuery,
  useCreateAdMutation,
  useEditPaymentMutation,
  useDeletePaymentMutation,
} = authApi
