import Toast from 'react-native-toast-message'
import { auth } from '../firebaseConfig.js'

export const getTripsFromDatabase = async () => {
  const token = await auth.currentUser.getIdToken()
  try {
    const response = await fetch('http://192.168.1.41:3000/api/v1/trips/user', {
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
  await fetch(`http://192.168.1.41:3000/api/v1/trips/${tripID}aa`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  }).then(response => {
    console.log('data', response)
    if (response.status === 200) {
      console.log('trip deleted from db')
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
  await fetch(`http://192.168.1.41:3000/api/v1/trips/${tripID}/passenger`, {
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
    const response = await fetch(`http://192.168.1.41:3000/api/v1/trips/${tripId}/requestsPassenger`, {
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
