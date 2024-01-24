import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setShouldLogout} from '../auth/configSlice'
import {userLoggedOut} from '../auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_CUSTOM_BASE_URL,
  prepareHeaders: (headers, {getState, endpoint, extra}) => {
    if (endpoint !== 'login') {
      let authToken = getState()?.adminUser?.tokens?.access?.token
      let refreshToken = getState()?.adminUser?.tokens?.refresh?.token
      let storeUserToken = authToken
      if (storeUserToken) {
        headers.set('Authorization', `Bearer ${storeUserToken}`)
      }
    }

    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.data) {
    } else if (result?.error) {
      console.log('error=> apislice', result.error, extraOptions)
      if (result.error.status === 401) {
        console.log('401')
        api.dispatch(userLoggedOut())
        api.dispatch(setShouldLogout())
      }
    }
    return result
  },
  // baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({}),
})
export const {} = apiSlice
