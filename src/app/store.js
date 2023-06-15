import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/auth/auth.js'
import userReducer from '../reducers/user.js'
import tripsReducer from '../reducers/trips.js'
import requestsPassengersReducer from '../reducers/requestsPassengers.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    trips: tripsReducer,
    requestsPassengers: requestsPassengersReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
