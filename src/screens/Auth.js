import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { setAuthState, signIn } from '../reducers/auth/auth.js'
import Login from './Login.js'
import SignUp from './Signup.js'
import { auth } from '../firebaseConfig.js'
import { validateEmail, validatePassword } from '../utils/validations'
import Toast from 'react-native-toast-message'

const AuthScreen = () => {
  const { authState } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onLogin = () => {
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)

    if (!emailValidation || !passwordValidation) {
      console.log('emailValidation', emailValidation)
      console.log('passwordValidation', passwordValidation)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Usuario o contraseña incorrectos'

      })
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(user => {
          dispatch(signIn(user._tokenResponse.idToken))
          dispatch(setAuthState('signedIn'))
        })
        .catch(error => {
          console.log('onLogin', error)
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Usuario o contraseña incorrectos'

          })
        })
    }
  }

  const onSignUp = () => {
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)

    if (!emailValidation || !passwordValidation) {
      console.log('emailValidation', emailValidation)
      console.log('passwordValidation', passwordValidation)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El correo o la contraseña no son válidos'

      })
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async user => {
          await updateProfile(auth.currentUser, {
            displayName: name
          })
          await createDocUser(user)
          dispatch(signIn(user._tokenResponse.idToken))
          dispatch(setAuthState('signedIn'))
        })
        .catch(error => {
          console.log('Not created user', error)
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'El email ya existe o la contraseña no es válido'

          })
        })
    }
  }

  const createDocUser = async (userData) => {
    console.log('CREATE NEW USER', userData)

    const token = await auth.currentUser.getIdToken()
    const user = {
      name: userData.user.displayName,
      email: userData.user.email
    }
    const userID = userData.user.uid.replace(/""/g, '')
    await fetch(`http://192.168.1.41:3000/api/v1/users/user/${userID}`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/""/g, '')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 201) {
          Toast.show({
            type: 'success',
            text1: 'Usuario creado',
            text2: 'Usuario creado correctamente'
          })
        }
      })
      .catch(error => console.log('ERROR CREATE DOC USER', error))
  }

  return (
    <>
      {authState === 'signIn' && (
        <Login
          onLogin={onLogin}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
      {authState === 'signUp' && (
        <SignUp
          onSignUp={onSignUp}
          setEmail={setEmail}
          setPassword={setPassword}
          setName={setName}
        />
      )}
    </>
  )
}

export default AuthScreen
