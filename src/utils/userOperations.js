import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../firebaseConfig.js'
import { updateEmail } from 'firebase/auth'

export const updateUserName = async (userID, newName) => {
  const token = await AsyncStorage.getItem('@token')
  await fetch(`http://192.168.1.36:3000/api/users/${userID.replace(/""/g, '')}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/""/g, '')}`
    },
    body: JSON.stringify({
      name: newName
    })
  }).then(response => {
    if (response.ok) {
      console.log('user name updated')
    } else {
      console.log('user name not updated')
    }
  }).catch(error => {
    console.log('user name fetch update error', error)
  })
}

export const updateUserPhone = async (userID, newPhone) => {
  const token = await AsyncStorage.getItem('@token')
  console.log('jajsdnaj', token)
  await fetch(`http://192.168.1.36:3000/api/users/${userID.replace(/""/g, '')}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/""/g, '')}`
    },
    body: JSON.stringify({
      phone: newPhone
    })
  }).then(response => {
    if (response.ok) {
      console.log('user name updated')
    } else {
      console.log('user name not updated')
    }
  }).catch(error => {
    console.log('user name fetch update error', error)
  })
}

export const updateUserUniversity = async (userID, newUniversity) => {
  const token = await AsyncStorage.getItem('@token')
  console.log('jajsdnaj', token)
  await fetch(`http://192.168.1.36:3000/api/users/${userID.replace(/""/g, '')}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/""/g, '')}`
    },
    body: JSON.stringify({
      university: newUniversity
    })
  }).then(response => {
    if (response.ok) {
      console.log('user university updated')
    } else {
      console.log('user university not updated')
    }
  }).catch(error => {
    console.log('user university fetch update error', error)
  })
}

export const updateUserEmail = async (userID, newEmail) => {
  updateEmail(auth.currentUser, newEmail)
    .then(() => {
      console.log('user email updated')
    })
    .catch(error => {
      console.log('user email update error', error)
    })
}
