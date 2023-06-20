import React, { useState, useLayoutEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebaseConfig.js'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { getUserProfile } from '../api/userOperations.js'
import Toast from 'react-native-toast-message'

const ChatListScreen = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([])

  useLayoutEffect(() => {
    const q = query(collection(db, 'chats'), where('participants', 'array-contains', auth.currentUser.uid))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rooms = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        const otherUserId = data.participants.filter((participant) => participant !== auth.currentUser.uid)
        return {
          roomId: doc.id,
          otherUserId,
          name: data.otherUserName

        }
      })
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
      <View className=' m-2 rounded-sm bg-white shadow shadow-gray-600 p-4'>
        <View className='flex-row justify-between align-middle '>
          <Text className='text-base font-bold mt-1 text-gray-900'>{otherUser.name}</Text>
          <TouchableOpacity
            className='w-1/4 bg-primary py-2 px-2 rounded-full'
            onPress={() => handleProfileUser(otherUser.uid)}
          >
            <Text className='text-white font-bold text-center'>
              Ver Perfil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='w-1/4 bg-blueColor py-2 px-2 rounded-full'
            onPress={() => enterChat(otherUser)}
          >
            <Text className='text-white font-bold text-center'>
              Chatear
            </Text>
          </TouchableOpacity>
        </View>

      </View>

    )
  }
  console.log(chatRooms.length)
  return (

    <View classname='flex-1'>
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
