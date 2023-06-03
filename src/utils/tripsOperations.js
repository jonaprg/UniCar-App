import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../firebaseConfig.js'

export const getTripsFromDatabase = async () => {
  const token = await auth.currentUser.getIdToken()
  const userID = await AsyncStorage.getItem('@userID')
  console.log('token', token)
  console.log('userID', userID.replace(/"/g, ''))
  try {
    const response = await fetch(`http://192.168.1.33:3000/api/v1/trips/trips/${userID.replace(/"/g, '')}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/""/g, '')}`
      }
    })
    const data = await response.json()
    console.log('data', data)
    return data
  } catch (error) {
    console.log('ERROR GET USER', error)
  }
}
