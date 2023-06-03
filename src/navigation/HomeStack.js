
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home.js'
import ResultsTrips from '../screens/ResultsTrips.js'
import DetailTrip from '../screens/DetailTrip.js'
import ReservationTrip from '../screens/ReservationTrip.js'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ResultsTrips'
        component={ResultsTrips}
        options={{ title: 'Resultados' }}
      />
      <Stack.Screen
        name='DetailTrip'
        component={DetailTrip}
        options={{ title: 'Detalle' }}
      />
      <Stack.Screen
        name='ReservationTrip'
        component={ReservationTrip}
        options={{ title: 'Reserva' }}
      />

    </Stack.Navigator>
  )
}

export default HomeStack
