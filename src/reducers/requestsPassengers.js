import {

  FETCH_REQUEST_TRIP_REQUEST,
  FETCH_REQUEST_TRIP_SUCCESS,
  FETCH_REQUEST_TRIP_FAILURE
} from './actions/requestPassengersActions.js'

const initialState = {
  data: [],
  isLoading: false,
  error: null
}
const requestsPassengersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST_TRIP_REQUEST:
      return { ...state, isLoading: true, error: null }
    case FETCH_REQUEST_TRIP_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null }
    case FETCH_REQUEST_TRIP_FAILURE:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}

export default requestsPassengersReducer
