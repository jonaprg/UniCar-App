import React, { useLayoutEffect, useState, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { db } from '../firebaseConfig.js'
import { collection, doc, onSnapshot, addDoc } from 'firebase/firestore'

const ChatScreen = ({ route }) => {
  const { currentUser, roomId } = route.params
  const [messages, setMessages] = useState([])

  // Referencia a la sala de chat en Firestore
  const roomRef = doc(db, 'chats', roomId)

  useLayoutEffect(() => {
    const getMessages = collection(roomRef, 'messages')
    const unsubscribe = onSnapshot(getMessages, (querySnapshot) => {
      const msgs = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {

          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user
        }
      })
      const sortedMessages = msgs.sort((a, b) => b.createdAt - a.createdAt)
      setMessages(sortedMessages)
    })

    return unsubscribe
  }, [])

  const handleSend = useCallback((messages = []) => {
    const messagesCollectionRef = collection(roomRef, 'messages')
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    )
    addDoc(messagesCollectionRef, messages[0])
  }, [])

  return (
    <GiftedChat
      messages={messages}
      user={{
        _id: currentUser

      }}
      onSend={handleSend}
    />
  )
}

export default ChatScreen
