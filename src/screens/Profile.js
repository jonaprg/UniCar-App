import React from 'react'
import { View, Image, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setAuthState, signOut } from '../reducers/auth/auth.js'
import { auth } from '../firebaseConfig.js'
import { signOut as signOutFirebase, deleteUser } from 'firebase/auth'
import FormButton from '../components/FormButton.js'
import { resetUser } from '../reducers/user.js'

// import useFetch from '../Hooks/useFetch.js'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  console.log('user', user)
  // const [userID, setUserID] = useState(null)
  // const [token, setToken] = useState(null)
  // const [user, setUser] = useState(null)
  // const { data, isLoading, isError } = useFetch(`users/${userID}`, 'GET', token)

  // useEffect(() => {
  //   const getUserIdToken = async () => {
  //     const id = await AsyncStorage.getItem('@userID')
  //     const t = await AsyncStorage.getItem('@token')
  //     setUserID(id)
  //     setToken(t)
  //   }
  //   const getUser = () => {
  //     if (data) {
  //       setUser(data)
  //     }
  //   }
  //   getUser()
  //   getUserIdToken()
  // }, [data])

  // if (!userID || !token) {
  //   return <ActivityIndicator size='large' />
  // }

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

  const handleDeleteAccount = async () => {
    const token = await AsyncStorage.getItem('@token')
    const user = auth.currentUser
    console.log('user', user)
    deleteUser(user)
      .then(async () => {
        console.log('user deleted')
        await fetch(`http://192.168.1.36:3000/api/users/${user.uid}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token.replace(/""/g, '')}`
          }
        })
        AsyncStorage.removeItem('@token')
        AsyncStorage.removeItem('@userID')
        dispatch(resetUser())
        dispatch(setAuthState('signIn'))
        dispatch(signOut())
      })
      .catch(error => {
        console.log('user delete error', error)
      })
  }
  return (
    <>

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
          <View className='px-2 py-2'>
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
            onPress={handleDeleteAccount}
          />
        </View>
      </View>

    </>
  )
}

export default Profile

// {isError &&
//   <View className='flex-1 justify-center align-middle'>
//     <Text>Something went wrong!</Text>
//   </View>}
// {isLoading
//   ? (
//     <View className='flex-1 justify-center align-middle'>
//       <ActivityIndicator size='large' />
//     </View>
//     )
//   : (
