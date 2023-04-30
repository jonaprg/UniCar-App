import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { signOut } from '../features/auth/auth.js'
import { auth } from '../firebaseConfig.js'
import { signOut as signOutFirebase } from 'firebase/auth'

const Profile = () => {
  const dispatch = useDispatch()

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title='SignOut' onPress={async () => {
          signOutFirebase(auth).catch(error => {
            console.log('user signOut', error)
          })
          await AsyncStorage.removeItem('@token')
          dispatch(signOut())
        }}
      />
    </View>
  )
}

export default Profile
