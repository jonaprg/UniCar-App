import React, { useEffect } from 'react'
import { View, Image, Text, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setAuthState, signOut } from '../features/auth/auth.js'
import { auth } from '../firebaseConfig.js'
import { signOut as signOutFirebase } from 'firebase/auth'
import FormButton from '../components/FormButton.js'

const Profile = () => {
  const [user, setUser] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    signOutFirebase(auth)
      .then(() => {
        AsyncStorage.removeItem('@token')
        AsyncStorage.removeItem('@userID')
        dispatch(setAuthState('signIn'))
        dispatch(signOut())
      })
      .catch(error => {
        console.log('user signOut', error)
      })
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const userID = await AsyncStorage.getItem('@userID')
        console.log('userID', userID)
        const token = await AsyncStorage.getItem('@token')
        console.log('token', token)
        if (token) {
          fetch(`http://192.168.1.38:3000/api/users/${userID.replace(/"/g, '')}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.replace(/"/g, '')}`
            }
          })
            .then(response => response.json())
            .then(data => {
              console.log('DATA', data)
              setUser(data)
              setIsLoading(false)
            })
            .catch(error => console.log('ERROR', error))
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.log('getUser', error)
        setIsLoading(false)
      }
    }
    getUser()
    console.log('user', user)
  }, [])

  if (isLoading) {
    return (
      <View className='flex-1 justify-center align-middle'>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return (
    <View className='px-2 py-2 '>
      <View className='border-b py-3 flex flex-row items-center px-5'>
        <Image source={require('../../assets/profile.png')} className='w-24 h-24 rounded' />
        <View className='ml-5'>
          <Text className='text-lg font-semibold '>Nombre</Text>
          <Text className='text-base font-medium'>{user?.name}</Text>
        </View>
      </View>
      <View className='border-b flex py-5 px-5 flex-row flex-wrap'>
        <View className=' px-2 py-2'>
          <Text className='text-lg font-bold text-buttonColor'>Correo electronico</Text>
          <Text>{user?.email}</Text>
        </View>
        <View className=' px-10 py-2'>
          <Text className='text-lg font-bold text-buttonColor'>Universidad</Text>
          <Text>{user?.university}</Text>
        </View>
        <View className=' px-2 py-2'>
          <Text className='text-lg font-bold text-buttonColor'>Móvil</Text>
          <Text>{user?.phone ?? 'No hay movil'}</Text>
        </View>
      </View>
      <View className='flex py-5 px-5 flex-row justify-around'>
        <View className=' px-2 py-2'>
          <Text className='text-lg font-bold text-buttonColor'>Vehículo</Text>
          <Text>{user?.car ?? 'No hay coche'}</Text>
        </View>
        <View className=' px-10 py-2'>
          <Text className='text-lg font-bold text-buttonColor'>Color</Text>
          <Text>{user?.color ?? 'No tienes color'}</Text>
        </View>
        <View className=' px-2 py-2'>
          <Text className='text-lg font-bold text-buttonColor'>Valoraciones</Text>
          <Text>{user?.valoracion ?? 'No hay valoraciones'}</Text>
        </View>
      </View>
      <View className='flex py-5 px-5 flex-col justify-around'>
        <Text className='text-lg font-bold text-buttonColor'>Preferencias</Text>
        <Text>No hay descripción</Text>
        <Text>No hay descripción</Text>
        <Text>No hay descripción</Text>
      </View>
      <View className='mt-5 items-center justify-center'>
        <FormButton
          buttonTitle='Cerrar sesión'
          onPress={handleLogout}
        />
        <FormButton
          className='bg-errorColor'
          buttonTitle='Eliminar cuenta'
          // onPress={() => { }  }
        />
      </View>
    </View>

  )
}

export default Profile
