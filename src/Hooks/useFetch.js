import { useEffect, useReducer } from 'react'

const reducer = (state, { type, responseJSON, error }) => {
  switch (type) {
    case 'LOADING':
      return { ...state, isLoading: true }
    case 'RESPONSE_COMPLETE':
      return { responseJSON, isLoading: false, error: null }
    case 'ERROR':
      return {
        responseJSON: null,
        isLoading: false,
        error
      }
    default:
      throw new Error('That action type is not supported')
  }
}

const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, {
    responseJSON: null,
    isLoading: true,
    error: null
  })

  let shouldCancel = false
  useEffect(() => {
    const callFetch = async () => {
      dispatch({ type: 'LOADING' })
      try {
        const res = await fetch(url)
        const responseJSON = await res.json()
        if (shouldCancel) return
        dispatch({ type: 'RESPONSE_COMPLETE', responseJSON })
      } catch (error) {
        if (shouldCancel) return
        dispatch({ type: 'ERROR', error })
      }
    }
    callFetch()
    return () => {
      shouldCancel = true
    }
  }, [])

  return state
}

export default useFetch
