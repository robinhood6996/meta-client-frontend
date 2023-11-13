import {objectToParam} from '../../../../helpers/objectParamsConversion'
import {apiSlice} from '../apiSlice'
// import {setAvailableCountries} from '../globalSearch'
// import {setIsLoggedOut, userLoggedIn, userLoggedOut} from './authSlice'

export const countryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCountry: builder.query({
      query: (search) => ({
        url: `/country?${objectToParam(search)}`,
        method: 'GET',
      }),
      providesTags: ['getAllCountry'],
    }),
    // getSingleCountry: builder.query({
    //   query: () => ({
    //     url: '/country',
    //     method: 'GET',
    //   }),
    //   providesTags: ['getAllCountry'],
    // }),
    deleteSingleCountry: builder.mutation({
      query: (id) => ({
        url: `/country/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getAllCountry'],
    }),
    createCountry: builder.mutation({
      query: ({countryName, description}) => ({
        url: `/country`,
        method: 'POST',
        body: {name: countryName, description},
      }),
      invalidatesTags: ['getAllCountry'],
    }),
    editCountry: builder.mutation({
      query: ({id, countryName, description}) => ({
        url: `/country/${id}`,
        method: 'PUT',
        body: {name: countryName, description},
      }),
      invalidatesTags: ['getAllCountry'],
    }),
  }),
})

export const {
  useGetAllCountryQuery,
  useDeleteSingleCountryMutation,
  useCreateCountryMutation,
  useEditCountryMutation,
} = countryApi
