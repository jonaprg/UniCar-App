/* eslint-disable react/prop-types */
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import FormInput from '../components/FormInput.js'
import FormButton from '../components/FormButton.js'
import { setAuthState } from '../features/auth/auth.js'
// import GoogleSignIn from '../components/GoogleSignIn.js'

const Login = ({ onLogin, setEmail, setPassword }) => {
  const dispatch = useDispatch()

  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Image source={require('../../assets/UniCarLogo.png')} className='w-64 h-64' />
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
