/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'

import FormInput from '../components/FormInput.js'
import FormButton from '../components/FormButton.js'
import { setAuthState } from '../reducers/auth/auth.js'
// import GoogleSignIn from '../components/GoogleSignIn.js'

const Login = ({ onLogin, setEmail, setPassword, errorMessage }) => {
  const dispatch = useDispatch()
  const [keyboardOpen, setKeyboardOpen] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true)
    })
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false)
    })

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const logoSize = keyboardOpen ? 150 : 250
  const marginSize = keyboardOpen ? 100 : 0
  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Image source={require('../../assets/UniCarLogo.png')} style={[{ marginTop: marginSize, width: logoSize, height: logoSize }]} />
      <View className='mb-7 w-64'>
        <Text className='text-4xl font-normal text-white'>Encuentra</Text>
        <Text className='text-4xl font-normal text-white'>coche rápido</Text>
        <Text className='text-4xl font-normal text-white'>y fácil</Text>
      </View>
      <FormInput
        name='Correo electronico'
        onChangeText={setEmail}
        placeholder='example@example.com'
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <FormInput
        name='Contraseña'
        onChangeText={setPassword}
        placeholder='********'
        secureTextEntry
      />
      <FormButton
        buttonTitle='Iniciar sesión'
        onPress={onLogin}
      />
      <Text className='text-errorColor text-center'>{errorMessage}</Text>
      <TouchableOpacity
        className='justify-items-center bg-primary flex-row py-3 px-4 mt-5'
        onPress={() => dispatch(setAuthState('signUp'))}
      >
        <Text className='font-bold text-gray-300'>No tienes una cuenta?</Text>
        <Text className='font-bold text-white'> Registrarse</Text>
      </TouchableOpacity>
    </View>

  )
}

export default Login

/**
 *         <View>
          <SocialButton
            buttonTitle='Iniciar sesión'
            btnType='primary'
            color='#fff'
            backgroundColor='#fb5b5a'
            onPress={() => googleLogin()}
          />
        </View>
*
*/
