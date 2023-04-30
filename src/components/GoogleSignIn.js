import React, { useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { Button } from 'react-native'
import { auth } from '../firebaseConfig.js'
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth'

WebBrowser.maybeCompleteAuthSession()

export default function GoogleSignIn () {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '638862561201-mserfhvto40435k8dds25jjthqusiofs.apps.googleusercontent.com'
  })
  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params
      console.log('access_token', response.params)
      const credential = GoogleAuthProvider.credential(access_token)
      console.log('crendeitla', credential)
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log('User signed in with Google!', result)
        })
        .catch((error) => {
          console.log('Error with Google sign in', error)
        })
    }
  }, [response])
  return (
    <Button
      title='Sign In With Google'
      disabled={!request}
      onPress={() => { promptAsync() }}
    />
  )
}
