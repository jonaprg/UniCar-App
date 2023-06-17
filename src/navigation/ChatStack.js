import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListChats from '../screens/ListChats.js'
import ChatScreen from '../screens/ChatScreen.js'

const Stack = createNativeStackNavigator()

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName='ListChats'>
      <Stack.Screen
        name='ListChats'
        component={ListChats}
        options={{
          title: 'Chats',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
        // Configuración para la pantalla de edición del coche
      />
      <Stack.Screen
        name='ChatScreen'
        component={ChatScreen}
        options={{
          title: 'Chat',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
        // Configuración para la pantalla de edición del coche
      />
    </Stack.Navigator>
  )
}

export default ChatStack
