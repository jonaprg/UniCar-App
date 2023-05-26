import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { setAuthState } from '../reducers/auth/auth.js'
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

    if (!emailValidation || !passwordValidation) {
      console.log('emailValidation', emailValidation)
      console.log('passwordValidation', passwordValidation)
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(user => {
          console.log('USER LOGEADO', user)

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
          createDocUser(user)
          dispatch(setAuthState('signedIn'))
        })
        .catch(error => {
          console.log('ongSingUp', error)
        })
    }
  }

  const createDocUser = async (userData) => {
    console.log('CREATE NEW USER', userData)

    const token = await auth.currentUser.getIdToken()
    const user = {
      name,
      university,
      email: userData.user.email
    }
    console.log('USER', user)
    const userID = userData.user.uid.replace(/""/g, '')
    await fetch(`http://192.168.1.39:3000/api/v1/users/user/${userID}`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/""/g, '')}`
      }
    })
      .then(response => response.json())
      .then(data => console.log('DATA CREATE DOC USER', data))
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
          setUniversity={setUniversity}
        />
      )}
    </>
  )
}

export default AuthScreen
