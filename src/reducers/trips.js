import {
  FETCH_TRIP_REQUEST,
  FETCH_TRIP_SUCCESS,
  FETCH_TRIP_FAILURE

} from './actions/tripActions.js'

const initialState = {
  data: [],
  isLoading: false,
  error: null
}

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRIP_REQUEST:
      return { ...state, isLoading: true, error: null }
    case FETCH_TRIP_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null }
    case FETCH_TRIP_FAILURE:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}

export default tripsReducer
