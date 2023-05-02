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

  if (isLoading) {
    return <Splash />
  }

  return (
    <NavigationContainer>
      {userToken ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default RootNavigator
