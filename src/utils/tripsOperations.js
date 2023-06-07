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
