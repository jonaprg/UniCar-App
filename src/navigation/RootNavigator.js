import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'

import AuthStack from './AuthStack.js'
import HomeStack from './HomeStack.js'
import Splash from '../screens/Splash.js'
import { restoreToken } from '../features/auth/auth.js'
import { auth } from '../firebaseConfig.js'
import { onAuthStateChanged } from 'firebase/auth'
import Home from '../screens/Home.js'

const RootNavigator = () => {
  const { userToken } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = React.useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User is signed in', user)
        await AsyncStorage.setItem('@token', user.getIdToken())
        dispatch(restoreToken(user.getIdToken()))
      } else {
        console.log('User is signed out')
        dispatch(restoreToken(null))
      }
      setIsLoading(false)
    })
    return unsubscribeAuth
  }, [])
  /* const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if (value !== null) {
        console.log('Token recuperado', value)
        dispatch(restoreToken(value))
      } else {
        console.log('No data')
        dispatch(restoreToken(null))
      }
    } catch (e) {
      console.log('get token error', e)
    }
  } */

  if (isLoading) {
    return <Splash />
  }

  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  )
}

export default RootNavigator

// {userToken ? <HomeStack /> : <AuthStack />}
