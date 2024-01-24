import {createSlice} from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user ?? false

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      state = action.payload
      return state
    },
    userLoggedOut: (state) => {
      localStorage.removeItem('user')
      state = false
      return state
    },
  },
})

export const {userLoggedIn, userLoggedOut} = authSlice.actions

export default authSlice.reducer
