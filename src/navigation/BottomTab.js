import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home.js'
import Profile from '../screens/Profile.js'
import { FontAwesome } from '@expo/vector-icons'

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
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' color={color} size={24} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name='Perfil'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name='user' color={color} size={24} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTab
