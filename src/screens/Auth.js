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
import { setUserNameRedux } from '../reducers/user.js'
import { validateEmail, validatePassword, validateName } from '../utils/validations.js'
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
          console.log('ERROR - Not authorized', error)
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
    const nameValidation = validateName(name)
    if (email === '' && password === '' && name === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Ingrese todos los datos'
      })
    } else if (email === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El correo electrónico no puede estar vacío'
      })
    } else if (password === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'La contraseña no puede estar vacía'
      })
    } else if (name === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El nombre no puede estar vacío'
      })
    } else if (!nameValidation) {
      Toast.show({
        type: 'error',
        text1: 'El nombre no es válido',
        text2: 'Debe contener al menos 3 caracteres'
      })
    } else if (!passwordValidation && !emailValidation) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El correo electrónico y la contraseña no son válidos'

      })
    } else if (!emailValidation) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El correo electrónico no es válido'

      })
    } else if (!passwordValidation) {
      Toast.show({
        type: 'error',
        text1: 'La contraseña no es válida',
        text2: 'Debe contener al menos 6 caracteres'

      })
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async user => {
          await updateProfile(auth.currentUser, {
            displayName: name
          })
          await createNewUser(user)
          await signInWithEmailAndPassword(auth, email, password)
            .then(user => {
              dispatch(signIn(user._tokenResponse.idToken))
              dispatch(setAuthState('signedIn'))
              dispatch(setUserNameRedux(name))
            })
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: `El correo electrónico ${email} ya está en uso`
          })
          console.log('ERROR - SignUp', error)
        })
    }
  }

  const createNewUser = async (userData) => {
    const token = await auth.currentUser.getIdToken()
    const user = {
      name,
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
      .catch(error => console.log('ERROR - Create user', error))
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
