import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  name: null,
  email: null,
  phone: null,
  university: null,
  carBrand: null,
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
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        university: action.payload.university,
        carBrand: action.payload.carBrand,
        carColor: action.payload.carColor,
        ratings: action.payload.ratings,
        preferences: action.payload.preferences,
        notificationToken: action.payload.notificationToken,
        profilePicture: action.payload.profilePicture
      }
    },
    resetUser: (state) => {
      return (state = {
        id: null,
        name: null,
        email: null,
        phone: null,
        university: null,
        carBrand: null,
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
    setUserPhoneRedux: (state, action) => {
      return {
        ...state,
        phone: action.payload
      }
    },
    setUserCarBrandRedux: (state, action) => {
      return {
        ...state,
        carBrand: action.payload
      }
    },
    setUserCarColorRedux: (state, action) => {
      return {
        ...state,
        carColor: action.payload
      }
    },
    setUserPreferencesRedux: (state, action) => {
      return {
        ...state,
        preferences: action.payload
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
  setUserPhoneRedux,
  setUserCarBrandRedux,
  setUserCarColorRedux,
  setUserPreferencesRedux
} = userSlice.actions
export default userSlice.reducer
