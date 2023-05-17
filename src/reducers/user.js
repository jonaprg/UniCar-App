import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  name: null,
  email: null,
  phone: null,
  university: null,
  carModel: null,
  carColor: null,
  ratings: null,
  preferences: null,
  notificationToken: null,
  profilePicture: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload)
    },
    resetUser: (state) => {
      return (state = {
        id: null,
        name: null,
        email: null,
        phone: null,
        university: null,
        carModel: null,
        carColor: null,
        ratings: null,
        preferences: null,
        notificationToken: null,
        profilePicture: null
      })
    },
    resetProfilePicture: (state, action) => {
      return {
        ...state,
        profilePicture: action.payload
      }
    },
    setUserNameRedux: (state, action) => {
      return {
        ...state,
        name: action.payload
      }
    },
    setUserEmailRedux: (state, action) => {
      return {
        ...state,
        email: action.payload
      }
    },
    setUserUniversityRedux: (state, action) => {
      return {
        ...state,
        university: action.payload
      }
    },
    setUserPhoneRredux: (state, action) => {
      return {
        ...state,
        phone: action.payload
      }
    }
  }
})

export const {
  setUser,
  resetUser,
  resetProfilePicture,
  setUserNameRedux,
  setUserEmailRedux,
  setUserUniversityRedux,
  setUserPhoneRredux
} = userSlice.actions
export default userSlice.reducer
