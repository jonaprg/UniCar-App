import { useEffect, useReducer } from 'react'
import fetchReducer from '../reducers/fetch.js'

const useFetch = (url = '', method, token) => {
  const initialState = {
    data: [],
    isLoading: false,
    isError: false
  }

  // call useReducer with reducer function.
  // call dispatch function to set the state with the action type
  // change action type accordingly.
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    // if component is unmounted during the fetch for any reason, don't set the states.
    let isMounted = true

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.replace(/"/g, '')}`
          }
        }
        const response = await fetch(`http://192.168.1.41:3000/api/v1/${url.replace(/"/g, '')}`, options)
        const json = await response.json()

        if (!isMounted) return
        dispatch({ type: 'FETCH_SUCCESS', payload: json })
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
      }
    }

    fetchData()

    // cleanup function
    return () => {
      isMounted = false
    }
  }, [url, method, token])

  return state
}

export default useFetch
