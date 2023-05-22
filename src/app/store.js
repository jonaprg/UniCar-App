import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from '../reducers/auth/auth.js'
import userReducer from '../reducers/user.js'
import tripReducer from '../reducers/trips.js'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  trip: tripReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })

})

export default store
