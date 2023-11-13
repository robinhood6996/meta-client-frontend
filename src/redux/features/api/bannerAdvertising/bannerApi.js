import {objectToParam} from '../../../../helpers/objectParamsConversion'
import {apiSlice} from '../apiSlice'
// import {setAvailableCountries} from '../globalSearch'
// import {setIsLoggedOut, userLoggedIn, userLoggedOut} from './authSlice'

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanners: builder.query({
      query: (query) => ({
        url: `/banner?${objectToParam(query)}`,
        method: 'GET',
      }),
      providesTags: ['getAllBanners'],
    }),
    updateBanner: builder.mutation({
      query: ({bannerId, active, isPaid}) => ({
        url: `/banner/${bannerId}`,
        method: 'PUT',
        body: {active, isPaid},
      }),
      invalidatesTags: ['getAllBanners'],
    }),
  }),
})

export const {useGetAllBannersQuery, useUpdateBannerMutation} = bannerApi
