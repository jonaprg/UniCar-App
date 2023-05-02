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
  const [name, setName] = useState('')
  const [university, setUniversity] = useState('')

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

    if (!emailValidation || !passwordValidation) {
      console.log('emailValidation', emailValidation)
      console.log('passwordValidation', passwordValidation)
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(user => {
          console.log('CREATE NEW USER', user)
          createDocUser(user)
          dispatch(setAuthState('signedIn'))
        })
        .catch(error => {
          console.log('ongSingUp', error)
        })
    }
  }
  const createDocUser = async (data) => {
    const token = await auth.currentUser.getIdToken()
    console.log('TOKEN create doc user', token)
    const user = {
      name,
      email: data.email,
      password: data.password,
      university
    }
    console.log('USER', user)
    try {
      const res = await fetch('http://localhost:3000/api/users/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      console.log('RESPONSE DOC', res)
      const data = await res.json()
      console.log('DATA CREATE DOC USER', data)
    } catch (error) {
      console.log('ERROR CREATE DOC USER', error)
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
          setName={setName}
          setUniversity={setUniversity}
        />
      )}
    </>
  )
}

export default AuthScreen
