import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home.js'
import Profile from '../screens/Profile.js'
import { FontAwesome } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name='Profile'
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
