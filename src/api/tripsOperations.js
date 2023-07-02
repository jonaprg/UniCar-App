import Toast from 'react-native-toast-message'
import { auth } from '../firebaseConfig.js'
import { BASE_URL } from '../utils/base_url.js'

export const getTripIdFromDatabase = async (id) => {
  const token = await auth.currentUser.getIdToken()
  try {
    const response = await fetch(`${BASE_URL}/api/v1/trips/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/""/g, '')}`
      }
    })
    if (response.status !== 200) {
      return []
    }
    return response.message
  } catch (error) {
    console.log('ERROR - Not authorized', error)
  }
}

export const getTripsFromDatabase = async () => {
  const token = await auth.currentUser.getIdToken()
  try {
    const response = await fetch(`${BASE_URL}/api/v1/trips/user`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/""/g, '')}`
      }
    })
    if (response.status !== 200) {
      return []
    }
    return await response.json()
  } catch (error) {
    console.log('ERROR - Not authorized', error)
  }
}

export const deleteDriverTrip = async (tripID) => {
  const token = await auth.currentUser.getIdToken()
  await fetch(`${BASE_URL}/api/v1/trips/${tripID}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  }).then(response => {
    if (response.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Viaje eliminado',
        text2: 'El viaje se ha eliminado correctamente'
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'No se pudo eliminar el viaje'
      })
    }
  }).catch(error => {
    console.log('ERROR - Not authorized', error)
  })
}

export const deletePassengerTrip = async (tripID) => {
  const token = await auth.currentUser.getIdToken()
  await fetch(`${BASE_URL}/api/v1/trips/${tripID}/passenger`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  }).then(response => {
    if (response.status === 200) {
      Toast.show({
        type: 'success',
        text2: 'El viaje se ha eliminado correctamente'
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'No te has podido desapuntar del viaje'
      })
    }
  }).catch(error => {
    console.log('ERROR - Not authorized', error)
  })
}

export const getRequestsByTripFromDatabase = async (tripId) => {
  const token = await auth.currentUser.getIdToken()
  console.log('token', token)
  try {
    const response = await fetch(`${BASE_URL}/api/v1/trips/requestsPassengers/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/""/g, '')}`
      }
    })
    if (response.status === 404 || response.status === 500) {
      return []
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log('ERROR GET USER', error)
  }
}

export const acceptPassenger = async (tripId, passengerId) => {
  let success = false
  const token = await auth.currentUser.getIdToken()
  await fetch(`${BASE_URL}/api/v1/trips/${tripId}/${passengerId}/acceptPassenger`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  }).then(response => {
    if (response.status === 200) {
      Toast.show({
        type: 'success',
        text2: 'Se ha aceptado el pasajero correctamente'
      })
      success = true
    } else {
      Toast.show({
        type: 'error',
        text1: 'No se ha podido aceptar el pasajero'
      })
    }
  }).catch(error => {
    console.log('ERROR - Not authorized', error)
  })
  return success
}

export const rejectPassenger = async (tripId, passengerId) => {
  let rejected = false
  const token = await auth.currentUser.getIdToken()
  await fetch(`${BASE_URL}/api/v1/trips/${tripId}/${passengerId}/rejectPassenger`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  }).then(response => {
    if (response.status === 200) {
      Toast.show({
        type: 'success',
        text2: 'Se ha rechazado el pasajero correctamente'
      })
      rejected = true
    } else {
      Toast.show({
        type: 'error',
        text1: 'No se ha podido rechazar el pasajero'
      })
    }
  }).catch(error => {
    console.log('ERROR - Not authorized', error)
  })
  return rejected
}
