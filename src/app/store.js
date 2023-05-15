import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/auth/auth.js'
import userReducer from '../reducers/user.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })

})

export default store
