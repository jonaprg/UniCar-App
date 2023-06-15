import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'

import AuthStack from './AuthStack.js'
import RootStack from './RootStack.js'
import Splash from '../screens/Splash.js'
import { restoreToken, setAuthState, signOut } from '../reducers/auth/auth.js'
import { auth } from '../firebaseConfig.js'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser } from '../reducers/user.js'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import Toast from 'react-native-toast-message'

const RootNavigator = () => {
  const { userToken } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = React.useState(true)
  const storage = getStorage()

  const getPhoto = async (id) => {
    let urld
    const imageRef = await ref(storage, `profilePictures/${id}`)
    if (imageRef._url !== undefined) {
      await getDownloadURL(imageRef)
        .then((url) => {
          urld = url
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'No se pudo obtener la foto de perfil'
          })
          console.log('ERROR - Get photo', error)
        })
    } else {
      urld = undefined
    }
    return urld
  }
  const dispatch = useDispatch()

  const getUser = async (userID, token) => {
    try {
      const response = await fetch(`http://192.168.1.41:3000/api/v1/users/${userID.replace(/""/g, '')}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token.replace(/""/g, '')}`
        }
      })
      const data = await response.json()
      if (response.status === 404 || response.status === 500) {
        Toast.show({
          type: 'error',
          text2: 'No se pudo obtener la información del usuario'
        })
        return []
      }
      return data.userData
    } catch (error) {
      dispatch(signOut())
      dispatch(setAuthState('signIn'))
      Toast.show({
        type: 'error',
        text2: 'No se pudo obtener la información del usuario'
      })
    }
  }
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid
        const url = await getPhoto(userId)
        await AsyncStorage.setItem('@userID', JSON.stringify(userId))
        const token = await user.getIdToken()
        await AsyncStorage.setItem('@token', JSON.stringify(token))
        const userData = await getUser(userId, token)
        dispatch(setUser({
          id: userId,
          name: userData.name,
          email: user.email,
          university: userData.university,
          phone: userData.phone,
          carBrand: userData.carBrand,
          carColor: userData.carColor,
          ratings: userData.ratings,
          preferences: userData.preferences,
          profilePicture: url
        }))
        dispatch(restoreToken(token))
      } else {
        dispatch(restoreToken(null))
      }
      setIsLoading(false)
    })
    return unsubscribeAuth
  }, [])

  if (isLoading) {
    return <Splash />
  }

  console.log('userToken', userToken)

  return (
    <NavigationContainer>
      {userToken ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default RootNavigator
