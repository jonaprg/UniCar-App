import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home.js'
import { FontAwesome } from '@expo/vector-icons'
import ProfileStack from './ProfileStack.js'

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
          headerShown: false,
          title: 'Inicio'
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
