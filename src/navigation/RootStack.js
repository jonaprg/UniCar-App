import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import BottomTab from './BottomTab'
const HStack = createNativeStackNavigator()

const configOptions = {
  headerTitleAlign: 'center',
  gestureEnabled: true,
  keyboardHandlingEnabled: true
}

const RootStack = () => {
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

export default RootStack
