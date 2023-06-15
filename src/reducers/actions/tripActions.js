import { getTripsFromDatabase } from '../../utils/tripsOperations.js'
export const FETCH_TRIP_REQUEST = 'FETCH_TRIP_REQUEST'
export const FETCH_TRIP_SUCCESS = 'FETCH_TRIP_SUCCESS'
export const FETCH_TRIP_FAILURE = 'FETCH_TRIP_FAILURE'

export const fetchTrips = () => async (dispatch) => {
  dispatch({ type: FETCH_TRIP_REQUEST })
  try {
    const data = await getTripsFromDatabase()
    dispatch({ type: FETCH_TRIP_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FETCH_TRIP_FAILURE, payload: error.message })
  }
}
