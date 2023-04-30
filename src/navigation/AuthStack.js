import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthScreen from '../screens/Auth'

const AuthNativeStack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <AuthNativeStack.Navigator>
      <AuthNativeStack.Screen
        name='Auth'
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </AuthNativeStack.Navigator>
  )
}

export default AuthStack
