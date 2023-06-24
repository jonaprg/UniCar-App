import React, { useLayoutEffect, useState, useCallback } from 'react'
import { Avatar, GiftedChat, MessageText, Bubble, Send } from 'react-native-gifted-chat'
import { Text } from 'react-native'
import { db } from '../firebaseConfig.js'
import { collection, doc, onSnapshot, addDoc } from 'firebase/firestore'
export const renderAvatar = (props) => (

  <Avatar
    {...props}
    containerStyle={{ left: { }, right: {} }}
    imageStyle={{ left: { }, right: {} }}
  />

)

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: { backgroundColor: '#F1F4F8', padding: 3 },
      right: { backgroundColor: '#94C9A9', padding: 3 }
    }}
    customTextStyle={{ fontSize: 15, lineHeight: 18 }}
  />
)

export const renderBubble = (props) => (
  <Bubble
    {...props}
    bottomContainerStyle={{
      left: { backgroundColor: '#F4F2F3', borderRadius: 1, borderWidth: 5, borderColor: '#F4F2F3' },
      right: { backgroundColor: '#488484', borderRadius: 1, borderWidth: 5, borderColor: '#488484' }
    }}
    containerToNextStyle={{
      left: { backgroundColor: '#F4F2F3', borderRadius: 10 },
      right: { backgroundColor: '#488484', borderRadius: 10 }
    }}
    containerToPreviousStyle={{
      left: { backgroundColor: '#F4F2F3', borderRadius: 10 },
      right: { backgroundColor: '#488484', borderRadius: 10 }
    }}
  />
)

export const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{

      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      marginBottom: 1
    }}
  ><Text style={{ color: 'blue', fontSize: 17 }}>Enviar</Text>
  </Send>
)

const ChatScreen = ({ route }) => {
  const { currentUser, roomId } = route.params
  const [messages, setMessages] = useState([])
  const [userProfilePicture, setUserProfilePicture] = useState('')
  const [userName, setUserName] = useState('')

  // Referencia a la sala de chat en Firestore
  const roomRef = doc(db, 'chats', roomId)

  useLayoutEffect(() => {
    const getUserProfilePicture = doc(db, 'users', currentUser)

    onSnapshot(getUserProfilePicture, (doc) => {
      const data = doc.data()
      setUserProfilePicture(data.profilePicture)
      setUserName(data.name)
    })
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
        _id: currentUser,
        name: userName || 'Usuario',
        avatar: userProfilePicture || 'https://placeimg.com/140/140/any'
      }}
      onSend={handleSend}
      messagesContainerStyle={{ backgroundColor: 'white' }}
      renderAvatar={renderAvatar}
      renderMessageText={renderMessageText}
      renderBubble={renderBubble}
      renderSend={renderSend}
      placeholder='Escribe un mensaje...'

    />
  )
}

export default ChatScreen
