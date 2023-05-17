
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile.js'
import CarEdit from '../screens/CarEdit.js'
const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='Profile'>
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{ title: 'Perfil' }}
        // Configuración para la pantalla de perfil
      />
      <Stack.Screen
        name='CarEdit'
        component={CarEdit}
        options={{ title: 'Editar coche' }}
        // Configuración para la pantalla de edición del coche
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
