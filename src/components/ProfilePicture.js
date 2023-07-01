import * as React from 'react'
import { View, Pressable, StyleSheet, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { resetProfilePicture } from '../reducers/user.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Toast from 'react-native-toast-message'
import { db } from '../firebaseConfig.js'
import { MaterialIcons } from '@expo/vector-icons'
import { doc, setDoc } from 'firebase/firestore'

export default function ProfilePicture () {
  const user = useSelector((state) => state.user)
  const { profilePicture, id } = user
  const dispatch = useDispatch()
  const storage = getStorage()

  const pickeImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      Toast.show({
        type: 'error',
        text2: 'La aplicación necesita permisos para acceder a la galería'
      })
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
      base64: true
    })
    if (!result.canceled) {
      savePhoto(result.assets[0].uri)
    }
  }

  const savePhoto = async (uri) => {
    try {
      const response = await fetch(uri)
      const blob = await response.blob()
      const storageRef = ref(storage, `profilePictures/${id}`)
      await uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded photo Storage')
      }).catch((error) => {
        Toast.show({
          type: 'error',
          text2: 'No se pudo actualizar la foto de perfil'
        })
        console.log('ERROR - Uploded photo Storage', error)
      })

      setTimeout(async () => {
        try {
          const imageRef = ref(storage, `profilePictures/${id}`)
          const url = await getDownloadURL(imageRef)

          await setDoc(doc(db, 'users', id), {
            profilePicture: url || ''
          }, { merge: true })

          dispatch(resetProfilePicture(url))
          Toast.show({
            type: 'success',
            text2: 'Foto de perfil actualizada'
          })
        } catch (error) {
          console.log('ERROR - Get photo from storage', error)
        }
      }, 1000)
    } catch (e) {
      console.log('ERROR - Save photo', e)
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={pickeImage}>
        {profilePicture !== undefined && profilePicture !== null && profilePicture !== ''
          ? (
            <Image source={{ uri: profilePicture }} style={styles.image} />
            )
          : (
            <MaterialIcons name='add-a-photo' size={60} color='black' />
            )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
})
