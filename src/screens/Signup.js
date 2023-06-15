import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import FormInput from '../components/FormInput.js'
import FormButton from '../components/FormButton.js'
import FormPasswordInput from '../components/FormPasswordInput.js'
import { setAuthState } from '../reducers/auth/auth.js'

const SignUp = ({ onSignUp, setEmail, setPassword, setName }) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false)

  const dispatch = useDispatch()
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
  return (
    <KeyboardAvoidingView
      className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={false}
    >
      <View className='flex-1 items-center justify-center bg-primary'>
        <Image source={require('../../assets/UniCarLogo.png')} style={[styles.logo, { width: logoSize, height: logoSize }]} />

        <FormInput
          name='Nombre y apellido'
          onChangeText={setName}
          placeholder='Nombre y apellido'
        />
        <FormInput
          name='Correo electronico'
          onChangeText={setEmail}
          placeholder='exemple@unicar.com'
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <FormPasswordInput
          name='Contraseña'
          onChangeText={setPassword}
          placeholder='*******'
        />
        <FormButton
          buttonTitle='Registrarse'
          onPress={onSignUp}
        />
        <TouchableOpacity
          className='justify-items-center bg-primary flex-row py-3 px-4 mt-5'
          onPress={() => dispatch(setAuthState('signIn'))}
        >
          <Text className='font-bold text-gray-300'>Tienes una cuenta?</Text>
          <Text className='font-bold text-white'> Inicia sessión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 60
  }
})
export default SignUp
