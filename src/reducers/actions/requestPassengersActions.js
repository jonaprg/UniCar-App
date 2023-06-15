import { getRequestsByTripFromDatabase } from '../../utils/tripsOperations.js'

export const FETCH_REQUEST_TRIP_REQUEST = 'FETCH_REQUEST_TRIP_REQUEST'
export const FETCH_REQUEST_TRIP_SUCCESS = 'FETCH_REQUEST_TRIP_SUCCESS'
export const FETCH_REQUEST_TRIP_FAILURE = 'FETCH_REQUEST_TRIP_FAILURE'

export const fetchRequestTrip = (trip) => async (dispatch) => {
  dispatch({ type: FETCH_REQUEST_TRIP_REQUEST })
  try {
    const requestsByTrip = await getRequestsByTripFromDatabase(trip)
    dispatch({ type: FETCH_REQUEST_TRIP_SUCCESS, payload: requestsByTrip })
  } catch (error) {
    dispatch({ type: FETCH_REQUEST_TRIP_FAILURE, payload: error.message })
  }
}
