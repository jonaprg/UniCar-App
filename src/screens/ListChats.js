import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebaseConfig.js'
import { collection, getDocs, doc, onSnapshot, query, where } from 'firebase/firestore'

const ChatListScreen = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([])

  const getChatRooms = async () => {
    const chatRoom = []
    const querySnapshot = await getDocs(collection(db, 'chats'))
    querySnapshot.docs.forEach((doc) => {
      chatRoom.push(doc.data())
    })
  }

  useLayoutEffect(() => {
    const q = query(collection(db, 'chats'), where('participants', 'array-contains', auth.currentUser.uid))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rooms = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        const participants = data.participants.filter((participant) => participant !== auth.currentUser.uid)
        return {
          roomId: doc.id,
          participants
        }
      })
      setChatRooms(rooms)
    })

    return unsubscribe
  }, [])

  const enterChat = (otherUser) => {
    navigation.navigate('Chat', { otherUser })
  }

  const renderChatRoom = ({ item }) => {
    const otherUser = {
      uid: item.participants[0]
    }

    return (
      <TouchableOpacity onPress={() => enterChat(otherUser)}>
        <Text>Chat with User: {otherUser.uid}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Text>ChatListScreen</Text>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.roomId}
        renderItem={renderChatRoom}
      />
    </View>
  )
}

export default ChatListScreen
