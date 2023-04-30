import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { setAuthState } from '../features/auth/auth.js'
import Login from './Login.js'
import SignUp from './Signup.js'
import { auth } from '../firebaseConfig.js'
import { validateEmail, validatePassword } from '../utils/validations'

const AuthScreen = () => {
  const { authState } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)

    if (emailValidation || passwordValidation) {
      console.log('emailValidation', emailValidation)
      console.log('passwordValidation', passwordValidation)
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(user => {
          console.log(user)
          dispatch(setAuthState('signedIn'))
        })
        .catch(error => {
          console.log('onLogin', error)
        })
    }
  }

  const onSignUp = () => {
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)

    if (emailValidation || passwordValidation) {
      console.log('emailValidation', emailValidation)
      console.log('passwordValidation', passwordValidation)
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(user => {
          console.log(user)
          dispatch(setAuthState('signedIn'))
        })
        .catch(error => {
          console.log('ongSingUp', error)
        })
    }
  }

  console.log('authState', authState)

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
        />
      )}
    </>
  )
}

export default AuthScreen
