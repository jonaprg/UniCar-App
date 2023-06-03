import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'

import AuthStack from './AuthStack.js'
import RootStack from './RootStack.js'
import Splash from '../screens/Splash.js'
import { restoreToken, setAuthState } from '../reducers/auth/auth.js'
import { auth } from '../firebaseConfig.js'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser } from '../reducers/user.js'

const RootNavigator = () => {
  const { userToken } = useSelector((state) => state.auth)
  const user = useSelector((state) => state.user)
  const [isLoading, setIsLoading] = React.useState(true)

  const dispatch = useDispatch()
  const getUser = async (userID, token) => {
    try {
      const response = await fetch(`http://192.168.1.33:3000/api/v1/users/${userID.replace(/""/g, '')}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token.replace(/""/g, '')}`
        }
      })
      const data = await response.json()
      console.log('I HAVE THE USER')
      return data
    } catch (error) {
      dispatch(setAuthState('signIn'))
      console.log('ERROR GET USER', error)
    }
  }
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User is signed in')
        const userId = user.uid
        await AsyncStorage.setItem('@userID', JSON.stringify(userId))
        const token = await user.getIdToken()
        await AsyncStorage.setItem('@token', JSON.stringify(token))
        const userData = await getUser(userId, token)
        console.log('userData', userData)
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
          profilePicture: `https://firebasestorage.googleapis.com/v0/b/unicar-jrg.appspot.com/o/profilePictures%2F${userId}?alt=media&token=435929b4-a6a1-46ac-898f-af689ea08cdd`
        }))
        dispatch(restoreToken(token))
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
  console.log('userToken', userToken)
  console.log('user', user)

  return (
    <NavigationContainer>
      {userToken ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default RootNavigator
