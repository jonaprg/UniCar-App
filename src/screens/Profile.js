import React, { useEffect } from 'react'
import { View, Button, Image, Text, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setAuthState, signOut } from '../features/auth/auth.js'
import { auth } from '../firebaseConfig.js'
import { signOut as signOutFirebase } from 'firebase/auth'

const Profile = () => {
  const [user, setUser] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    signOutFirebase(auth)
      .then(() => {
        AsyncStorage.removeItem('@token')
        AsyncStorage.removeItem('@userID')
        dispatch(setAuthState('signIn'))
        dispatch(signOut())
      })
      .catch(error => {
        console.log('user signOut', error)
      })
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const userID = await AsyncStorage.getItem('@userID')
        console.log('userID', userID)
        const token = await AsyncStorage.getItem('@token')
        console.log('token', token)
        if (token) {
          fetch(`http://192.168.1.37:3000/api/users/${userID.replace(/"/g, '')}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.replace(/"/g, '')}`
            }
          })
            .then(response => response.json())
            .then(data => {
              console.log('DATA', data)
              setUser(data)
              setIsLoading(false)
            })
            .catch(error => console.log('ERROR', error))
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.log('getUser', error)
        setIsLoading(false)
      }
    }
    getUser()
    console.log('user', user)
  }, [])

  if (isLoading) {
    return (
      <View className='flex-1 justify-center align-middle'>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return (
    <View className='flex-1 items-center'>
      <View className='flex-row bg-slate-300'>
        <Image source={require('../../assets/adaptive-icon.png')} className='w-32 h-32' />
        <Text>{user?.name}</Text>
      </View>
      <View className='bg-slate-400 flex-row'>
        <View>
          <Text>Correo electronico</Text>
          <Text>{user?.email}</Text>
        </View>
        <View>
          <Text>Universidad</Text>
          <Text>{user?.university}</Text>
        </View>
      </View>
      <Button
        title='SignOut' onPress={handleLogout}
      />
    </View>
  )
}

export default Profile
