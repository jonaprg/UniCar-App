import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../firebaseConfig.js'
import { updateEmail } from 'firebase/auth'
import Toast from 'react-native-toast-message'

export const updateUserName = async (userID, newName) => {
  let successUpdate = false
  const token = await AsyncStorage.getItem('@token')
  await fetch(`http://192.168.1.41:3000/api/v1/users/${userID.replace(/""/g, '')}AA`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    },
    body: JSON.stringify({
      name: newName
    })
  }).then(response => {
    if (response.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Nombre actualizado correctamente'
      })
      successUpdate = true
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error al actualizar el nombre',
        text2: 'No se pudo actualizar el nombre'
      })
    }
  }).catch(error => {
    console.log('ERROR - Not authorized', error)
  })
  return successUpdate
}

export const updateUserPhone = async (userID, newPhone) => {
  let successUpdate = false
  const token = await AsyncStorage.getItem('@token')
  await fetch(`http://192.168.1.41:3000/api/v1/users/${userID.replace(/""/g, '')}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    },
    body: JSON.stringify({
      phone: newPhone
    })
  }).then(response => {
    if (response.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Teléfono actualizado correctamente'
      })
      successUpdate = true
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error al actualizar el teléfono',
        text2: 'No se pudo actualizar el teléfono'
      })
    }
  }).catch(error => {
    console.log('ERROR - Not authorized', error)
  })
  return successUpdate
}

export const updateUserUniversity = async (userID, newUniversity) => {
  let successUpdate = false
  const token = await AsyncStorage.getItem('@token')
  await fetch(`http://192.168.1.41:3000/api/v1/users/${userID.replace(/""/g, '')}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token.replace(/"/g, '')}`
    },
    body: JSON.stringify({
      university: newUniversity
    })
  }).then(response => {
    if (response.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Universidad actualizada correctamente'
      })
      successUpdate = true
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error al actualizar la universidad',
        text2: 'No se pudo actualizar la universidad'
      })
    }
  }).catch(error => {
    console.log('ERROR - Not authorized', error)
  })
  return successUpdate
}

export const updateUserEmail = async (userID, newEmail) => {
  let successUpdate = false
  updateEmail(auth.currentUser, newEmail)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Email actualizado correctamente'
      })
      successUpdate = true
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Email no se pudo actualizar'
      })
      console.log('ERROR - Email not updated', error)
    })
  return successUpdate
}

export const getUserProfile = async (userID) => {
  const token = await AsyncStorage.getItem('@token')
  try {
    const response = await fetch(`http://192.168.1.41:3000/api/v1/users/${userID.replace(/""/g, '')}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/"/g, '')}`
      }
    })
    const data = await response.json().then(data => data)
    return data
  } catch (error) {
    console.log('ERROR - Not authorized', error)
  }
}
