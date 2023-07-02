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
import Toast from 'react-native-toast-message'
import { BASE_URL } from '../utils/base_url.js'

const RootNavigator = () => {
  const { userToken } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = React.useState(true)

  const dispatch = useDispatch()

  const getUser = async (userID, token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/users/${userID.replace(/""/g, '')}`, {
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
          profilePicture: userData.profilePicture ?? ''
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
