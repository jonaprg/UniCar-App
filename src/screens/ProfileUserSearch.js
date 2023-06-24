import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../firebaseConfig.js'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const ProfileUserSearch = ({ route }) => {
  const { data, id } = route.params
  const navigation = useNavigation()
  const user = useSelector(state => state.user)

  const createRoomdId = (uid1, uid2) => {
    const smallerUid = uid1 < uid2 ? uid1 : uid2
    const biggerUid = uid1 > uid2 ? uid1 : uid2
    return `${smallerUid}-${biggerUid}`
  }

  const addRoomId = async (uid1, uid2) => {
    const roomId = createRoomdId(uid1, uid2)
    try {
      const docRef = doc(db, 'chats', roomId)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        const roomData = {
          participants: [uid1, uid2],
          roomId,
          otherUserName: data.name,
          currentUserName: user.name
        }
        await setDoc(doc(db, 'chats', roomId), roomData)
      }
    } catch (error) { console.log('ERROR - Not authorized', error) }
    navigation.navigate('ChatScreen', { currentUser: auth.currentUser.uid, otherUser: id, roomId })
  }

  return (
    <View className='bg-secondary rounded-lg shadow flex-1  '>

      {/* Contenido de la tarjeta */}
      <View className='p-4'>
        <View className=' border-b-2 border-secondary'>
          <View className='flex-row  flex-wrap mb-2'>
            <View className='flex-row items-center'>
              {data.profilePicture !== ''
                ? (
                  <Image source={{ uri: data.profilePicture }} className='w-16 h-16 rounded-full' />
                  )
                : (
                  <Image source={require('../../assets/profile.png')} className='w-16 h-16 rounded-full' />

                  )}

              <Text className='text-2xl font-bold ml-4'>{data.name}</Text>
            </View>
          </View>
          {/* Fecha y hora */}
          <View className='my-2'>
            <Text className='text-xl font-bold'>Móvil</Text>
            <Text className='text-lg font-base'>{data.phone ?? 'No esta disponible'}</Text>
          </View>
        </View>
        <View className='flex-row justify-between items-center border-b-2 border-secondary'>

          <View className='flex-column my-5'>
            <Text className='text-lg font-bold'>Coche</Text>
            {data.carBrand
              ? (
                <View>
                  <Text className='text-lg font-base'>{data.carBrand}</Text>
                  <Text className='text-base font-base text-gray-500 '>{data.carColor}</Text>
                </View>
                )
              : (
                <Text className='text-lg font-base'>No disponible</Text>
                )}
          </View>

        </View>
        <View className='flex-column my-5 border-b-2 border-secondary'>
          <Text className='text-lg font-normal'>Preferencias</Text>
          {data.preferences && data.preferences.length > 0
            ? (
              <FlatList
                data={data.preferences}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text className='text-base font-bold my-2'>{item}</Text>
                )}
              />
              )
            : (
              <Text className='text-base font-bold'>No hay preferencias disponibles</Text>
              )}
        </View>
        <View className='flex-row justify-between items-center'>

          <Text className='text-lg font-normal'>Contacta vía mensaje</Text>
          <TouchableOpacity
            className='bg-blueColor px-3 py-2 rounded ml-auto'
            onPress={() => addRoomId(auth.currentUser.uid, id)}
          >
            <Text className='text-white font-bold'>Abrir chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ProfileUserSearch
