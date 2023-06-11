import * as React from 'react'
import { View, Pressable, StyleSheet, Image, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { resetProfilePicture } from '../reducers/user.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function ProfilePicture () {
  const user = useSelector((state) => state.user)
  const { profilePicture, id } = user
  const dispatch = useDispatch()
  const storage = getStorage()

  const pickeImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      Alert.alert('La aplicación necesita permisos para acceder a la galería')
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
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot)
      }).catch((error) => {
        console.log('ERROR uploded', error)
      })

      const imageRef = await ref(storage, `profilePictures/${id}`)
      await getDownloadURL(imageRef)
        .then((url) => {
          dispatch(resetProfilePicture(url))
        })
        .catch((error) => {
          console.log('ERROR', error)
        })
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={pickeImage}>
        {profilePicture !== undefined
          ? (
            <Image source={{ uri: profilePicture }} style={styles.image} />
            )
          : (
            <Image source={require('../../assets/profile.png')} style={styles.image} />
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
