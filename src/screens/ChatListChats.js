import React, { useState, useLayoutEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebaseConfig.js'
import { collection, onSnapshot, query, where, doc, getDoc } from 'firebase/firestore'
import { getUserProfile } from '../api/userOperations.js'
import Toast from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons'

const ChatListScreen = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([])
  useLayoutEffect(() => {
    const q = query(collection(db, 'chats'), where('participants', 'array-contains', auth.currentUser.uid))
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const rooms = []

      for (const docS of querySnapshot.docs) {
        const data = docS.data()
        const otherUserId = data.participants.filter((participant) => participant !== auth.currentUser.uid)

        const userDoc = await getDoc(doc(db, 'users', otherUserId[0]))
        const userName = userDoc.data().name

        rooms.push({
          roomId: docS.id,
          otherUserId,
          name: userName
        })
      }

      setChatRooms(rooms)
    })

    return unsubscribe
  }, [])

  const enterChat = (otherUser) => {
    navigation.navigate('ChatScreen', { currentUser: auth.currentUser.uid, roomId: otherUser.roomId })
  }

  const handleProfileUser = async (id) => {
    const reponse = await getUserProfile(id)
    if (reponse.status !== 200) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se ha podido cargar el perfil del usuario'
      })
    } else {
      navigation.navigate('ProfileUser', { data: reponse.userData, id })
    }
  }
  const renderChatRoom = ({ item }) => {
    const otherUser = {
      uid: item.otherUserId[0],
      name: item.name,
      roomId: item.roomId
    }

    return (
      <View className=' m-1 rounded-sm bg-white shadow shadow-gray-600 p-3'>
        <View className='flex-row justify-between  '>

          <Text className='text-base font-bold mt-1 text-gray-900'>{otherUser.name ?? ''}</Text>
          <View className='flex-row gap-8'>
            <TouchableOpacity
              className=' bg-primary p-2 rounded-full'
              onPress={() => handleProfileUser(otherUser.uid)}
            >
              <Ionicons name='information-circle-sharp' size={24} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
              className=' bg-blueColor p-2 rounded-full'
              onPress={() => enterChat(otherUser)}
            >
              <Ionicons name='chatbox-ellipses-sharp' size={24} color='white' />
            </TouchableOpacity>

          </View>
        </View>

      </View>

    )
  }
  return (

    <View classname='flex-1 bg-secondary'>
      {chatRooms.length !== 0
        ? (
          <FlatList
            data={chatRooms}
            keyExtractor={(item) => item.roomId}
            renderItem={renderChatRoom}
          />
          )
        : (

          <View className=' justify-center  bg-red mt-10'>
            <Text className='text-3xl font-bold text-center  text-blueColor '>No hay chats</Text>
          </View>

          )}
    </View>

  )
}

export default ChatListScreen
