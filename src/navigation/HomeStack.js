import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import BottomTab from './BottomTab'
const HStack = createNativeStackNavigator()

const configOptions = {
  headerShown: false,
  headerTitleAlign: 'center',
  gestureEnabled: true,
  keyboardHandlingEnabled: true
}

const HomeStack = () => {
  return (
    <HStack.Navigator initialRouteName='Home' screenOptions={configOptions}>
      <HStack.Screen
        name='root'
        component={BottomTab}
        options={{ headerShown: false }}
      />
    </HStack.Navigator>
  )
}

export default HomeStack
