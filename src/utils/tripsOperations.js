import { auth } from '../firebaseConfig.js'

export const getTripsFromDatabase = async () => {
  const token = await auth.currentUser.getIdToken()
  console.log('token', token)
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
    const data = await response.json()
    console.log('data', data)
    return data
  } catch (error) {
    console.log('ERROR GET USER', error)
  }
}

export const deleteDriverTrip = async (tripID) => {
  const token = await auth.currentUser.getIdToken()
  let isDeleted = false
  await fetch(`http://192.168.1.41:3000/api/v1/trips/${tripID}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  }).then(response => {
    if (response.ok) {
      console.log('trip deleted from db')
      isDeleted = true
    } else {
      console.log('trip not deleted')
    }
  }).catch(error => {
    console.log('Error not deleted trip', error)
  })
  return isDeleted
}

export const deletePassengerTrip = async (tripID) => {
  const token = await auth.currentUser.getIdToken()
  let isDeleted = false
  await fetch(`http://192.168.1.41:3000/api/v1/trips/${tripID}/passenger`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    }
  }).then(response => {
    if (response.ok) {
      console.log('trip deleted from db')
      isDeleted = true
    } else {
      console.log('trip not deleted')
    }
  }).catch(error => {
    console.log('Error not deleted trip', error)
  })
  return isDeleted
}
