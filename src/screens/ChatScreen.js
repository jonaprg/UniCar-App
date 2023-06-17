import React, { useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { auth, db } from '../firebaseConfig.js'

// Componente de chat
const ChatScreen = ({ route }) => {
  const { otherUser } = route.params
  const [messages, setMessages] = useState([])

  // Referencia a la sala de chat en Firestore
  const chatRef = db.collection('chats').doc(auth.currentUser.uid + otherUser.uid)

  useEffect(() => {
    // Carga los mensajes existentes de la sala de chat al inicio
    const unsubscribe = chatRef
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user
          }
        })
        setMessages(messages)
      })

    return () => unsubscribe() // Limpia el listener al salir del chat
  }, [])

  const handleSend = async (newMessages) => {
    const { text, user } = newMessages[0]
    const message = {
      text,
      createdAt: new Date(),
      user
    }

    // Guarda el nuevo mensaje en Firestore
    await chatRef.collection('messages').add(message)

    // Actualiza el estado local de los mensajes
    setMessages((previousMessages) => GiftedChat.append(previousMessages, message))
  }

  return (
    <GiftedChat
      messages={messages}
      user={{
        _id: auth.currentUser.uid
      }}
      onSend={handleSend}
    />
  )
}

export default ChatScreen
