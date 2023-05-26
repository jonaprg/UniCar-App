import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from '../reducers/auth/auth.js'
import userReducer from '../reducers/user.js'
import tripsReducer from '../reducers/trips.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    trips: tripsReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
