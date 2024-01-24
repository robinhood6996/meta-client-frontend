import {objectToParam} from '../../../../helpers/objectParamsConversion'
import {apiSlice} from '../apiSlice'
// import {setAvailableCountries} from '../globalSearch'
// import {setIsLoggedOut, userLoggedIn, userLoggedOut} from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAd: builder.mutation({
      query: (data) => ({
        url: '/project',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['getAllAds'],
    }),
    geActiveAds: builder.query({
      query: (query) => ({
        url: `/project?${objectToParam(query)}`,
        method: 'GET',
      }),
      providesTags: ['getAllAds'],
    }),
    deleteSingleUser: builder.mutation({
      query: (username) => ({
        url: `/auth/delete-user?username=${username}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getAllUser'],
    }),
    userRegistration: builder.mutation({
      query: (registerData) => ({
        url: '/auth/register',
        method: 'POST',
        body: registerData,
      }),
      invalidatesTags: ['getAllUser'],
    }),
    // userLoggedOut: builder.query({
    //   query: () => ({
    //     url: '/asiris_auth/auth/logout',
    //     method: 'GET',
    //   }),
    //   async onQueryStarted(arg, {dispatch, queryFulfilled}) {
    //     try {
    //       let result = await queryFulfilled
    //       if (result) {
    //         // dispatch(userLoggedOut())
    //         localStorage.removeItem('authUser')
    //       }
    //     } catch (err) {
    //       console.log('err: ', err)
    //       // dispatch(userLoggedOut())
    //       localStorage.removeItem('authUser')
    //     }
    //   },
    //   keepUnusedDataFor: 0,
    //   providesTags: [''],
    // }),
  }),
})

export const {
  useCreateAdMutation,
  useGeActiveAdsQuery,
  useDeleteSingleUserMutation,
  useUserRegistrationMutation,
} = authApi
