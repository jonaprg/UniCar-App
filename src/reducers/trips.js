import { createSlice } from '@reduxjs/toolkit'
import { getTripsFromDatabase } from '../utils/tripsOperations.js'
const initialState = []

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    getTrips: async (state, action) => {
      const trips = await getTripsFromDatabase()
      console.log(JSON.stringify(trips))
      return {
        ...state,
        trips
      }
    }

  }
})

export const {
  getTrips

} = tripsSlice.actions
export default tripsSlice.reducer
