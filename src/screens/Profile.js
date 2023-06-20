import React from 'react'
import { View, RefreshControl, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setAuthState, signOut } from '../reducers/auth/auth.js'
import { auth } from '../firebaseConfig.js'
import { signOut as signOutFirebase } from 'firebase/auth'
import FormButton from '../components/FormButton.js'
import { resetUser, setUser } from '../reducers/user.js'
import ProfilePicture from '../components/ProfilePicture.js'
import ProfileInfo from '../components/ProfileInfo.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Toast } from 'react-native-toast-message/lib/src/Toast.js'
const Profile = () => {
  const dispatch = useDispatch()

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    const token = await auth.currentUser.getIdToken()
    const userId = await auth.currentUser.uid
    try {
      const response = await fetch(`http://192.168.1.41:3000/api/v1/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.replace(/""/g, '')}`
        }
      })
      const data = await response.json().then(data => data)
      dispatch(setUser({
        id: userId,
        name: data.userData.name,
        email: auth.currentUser.email,
        university: data.userData.university,
        phone: data.userData.phone,
        carBrand: data.userData.carBrand,
        carColor: data.userData.carColor,
        ratings: data.userData.ratings,
        preferences: data.userData.preferences,
        profilePicture: data.userData.profilePicture
      }))
    } catch (error) {
      console.log('ERROR - Failed to refresh', error)
    } finally {
      setRefreshing(false)
    }
  }, [dispatch])

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
