import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import ProfileStack from './ProfileStack.js'
import HomeStack from './HomeStack.js'
import DriverStack from './DriverStack.js'
import TripsStack from './TripsStack.js'
import ChatStack from './ChatStack.js'

const Tab = createBottomTabNavigator()
const screenOptions = {
  tabBarActiveTintColor: '#86BBD8',
  tabBarInactiveTintColor: '#F1F4F8',
  tabBarStyle: {
    backgroundColor: '#023047',
    height: 70
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10
  },
  tabBarIconStyle: {
    marginTop: 10
  },
  tabBarHideOnKeyboard: true
}

const BottomTab = () => {
  return (
    <Tab.Navigator {...{ screenOptions }}>
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' color={color} size={24} />
          ),
          headerShown: false,
          title: 'Inicio'
        }}
      />
      <Tab.Screen
        name='DriverStack'
        component={DriverStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name='pluscircleo' color={color} size={24} />
          ),
          headerShown: false,
          title: 'Publicar'
        }}
      />
      <Tab.Screen
        name='TripsStack'
        component={TripsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='list-circle-outline' color={color} size={24} />
          ),
          headerShown: false,
          title: 'Rutas'
        }}
      />
      <Tab.Screen
        name='ChatStack'
        component={ChatStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='chatbox' size={24} color={color} />),
          headerShown: false,
          title: 'Perfil'
        }}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name='user' color={color} size={24} />
          ),
          headerShown: false,
          title: 'Perfil'
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomTab
