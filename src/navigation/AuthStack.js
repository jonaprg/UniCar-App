import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login.js'
import Signup from '../screens/Signup.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Auth = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name='Signup'
        component={Signup}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  )
}

export default AuthStack