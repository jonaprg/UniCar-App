
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile.js'
import CarBrandEdit from '../screens/CarBrandEdit.js'
import CarColorEdit from '../screens/CarColorEdit.js'
import PreferencesEdit from '../screens/PreferencesEdit.js'
const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='Profile'>
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{
          title: 'Perfil',
          headerStyle: {
            backgroundColor: '#488484'
          }
        }}
        // Configuración para la pantalla de perfil
      />
      <Stack.Screen
        name='CarBrandEdit'
        component={CarBrandEdit}
        options={{
          title: 'Marca del coche',
          headerStyle: {
            backgroundColor: '#488484'
          }
        }}
        // Configuración para la pantalla de edición del coche
      />
      <Stack.Screen
        name='CarColorEdit'
        component={CarColorEdit}
        options={{
          title: 'Color del coche',
          headerStyle: {
            backgroundColor: '#488484'
          }
        }}
        // Configuración para la pantalla de edición del coche
      />
      <Stack.Screen
        name='PreferencesEdit'
        component={PreferencesEdit}
        options={{
          title: 'Preferencias',
          headerStyle: {
            backgroundColor: '#488484'
          }
        }}
        // Configuración para la pantalla de edición del coche
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
