import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatListScreen from '../screens/ChatListChats.js'
import ChatScreen from '../screens/ChatScreen.js'
import ProfileUser from '../screens/ProfileUser.js'

const Stack = createNativeStackNavigator()

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName='ChatListScreen'>
      <Stack.Screen
        name='ChatListScreen'
        component={ChatListScreen}
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
      <Stack.Screen
        name='ProfileUser'
        component={ProfileUser}
        options={{
          title: 'Perfil de usuario',
          headerStyle: {
            backgroundColor: '#488484'
          },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  )
}

export default ChatStack
