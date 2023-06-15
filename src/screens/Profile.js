import React from 'react'
import { View, RefreshControl, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setAuthState, signOut } from '../reducers/auth/auth.js'
import { auth } from '../firebaseConfig.js'
import { signOut as signOutFirebase } from 'firebase/auth'
import FormButton from '../components/FormButton.js'
import { resetUser } from '../reducers/user.js'
import ProfilePicture from '../components/ProfilePicture.js'
import ProfileInfo from '../components/ProfileInfo.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Toast } from 'react-native-toast-message/lib/src/Toast.js'
const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [user])

  const handleLogout = async () => {
    signOutFirebase(auth)
      .then(() => {
        AsyncStorage.removeItem('@token')
        AsyncStorage.removeItem('@userID')
        dispatch(setAuthState('signIn'))
        dispatch(resetUser())
        dispatch(signOut())
      })
      .catch(error => {
        console.log('ERROR- Not sign out', error)
      })
  }

  const handleDeleteAccount = async () => {
    const token = await AsyncStorage.getItem('@token')
    const user = auth.currentUser

    await fetch(`http://192.168.1.41:3000/api/v1/users/${user.uid.replace(/""/g, '')}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/"/g, '')}`
      }
    }).then(response => {
      if (response.status === 200) {
        AsyncStorage.removeItem('@token')
        AsyncStorage.removeItem('@userID')
        dispatch(resetUser())
        dispatch(setAuthState('signIn'))
        dispatch(signOut())
      } else {
        Toast.show({
          type: 'error',
          text1: 'No se pudo eliminar la cuenta'
        })
      }
    }).catch(error => {
      console.log('ERORR - Not authorized', error)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        nestedScrollEnabled
      >
        <View>
          <ProfilePicture />
          <ProfileInfo />
          <View className='mt-5 items-center justify-center'>
            <FormButton
              buttonTitle='Cerrar sesión'
              onPress={handleLogout}
            />
            <FormButton
              className='bg-errorColor'
              buttonTitle='Eliminar cuenta'
              onPress={() =>
                Alert.alert('Quieres eliminar tu cuenta?', 'Se eliminará todos los datos que tengas en esta cuenta', [
                  {
                    text: 'Cancelar',
                    onPress: () => Toast.show({
                      type: 'info',
                      text1: 'Cancelado'
                    }),
                    style: 'cancel'
                  },
                  { text: 'Eliminar', onPress: () => handleDeleteAccount() }
                ])}

            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
//   <View className='border-b py-3 flex flex-row items-center px-5'>
//   <Image source={require('../../assets/profile.png')} className='w-24 h-24 rounded' />
//   <View className='ml-5'>
//     <Text className='text-lg font-semibold '>Nombre</Text>
//     <Text className='text-base font-medium'>{user?.name}</Text>
//   </View>
// </View>
