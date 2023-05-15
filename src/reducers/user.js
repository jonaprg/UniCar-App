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
      return (state = initialState)
    }
  }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
