/* eslint-disable react/prop-types */
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import FormInput from '../components/FormInput.js'
import FormButton from '../components/FormButton.js'
import { setAuthState } from '../features/auth/auth.js'
import GoogleSignIn from '../components/GoogleSignIn.js'

const Login = ({ onLogin, setEmail, setPassword }) => {
  const dispatch = useDispatch()

  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Image source={require('../../assets/UniCarLogo.png')} className='w-64 h-64' />
      <View className='mb-10'>
        <Text className='text-4xl font-normal text-white'>Encuentra</Text>
        <Text className='text-4xl font-normal text-white'>coche rápido</Text>
        <Text className='text-4xl font-normal text-white'>y fácil</Text>
      </View>
      <FormInput
        onChangeText={setEmail}
        placeholder='Correo electronico'
        keyboard='email-address'
      />
      <FormInput
        onChangeText={setPassword}
        placeholder='Contraseña'
        secureTextEntry
      />
      <FormButton
        buttonTitle='Iniciar sesión'
        onPress={onLogin}
      />
      <GoogleSignIn />
      <TouchableOpacity
        className='w-64 bg-buttonColor py-3 rounded-full'
        onPress={() => dispatch(setAuthState('signUp'))}
      >
        <Text className='text-center text-white'>Crear una nueva cuenta</Text>
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
