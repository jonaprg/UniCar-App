import React, { useEffect, useState } from 'react'
import { View, Text, Linking, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import FormInput from '../components/FormInput.js'
import FormButton from '../components/FormButton.js'
import FormPasswordInput from '../components/FormPasswordInput.js'
import { setAuthState } from '../reducers/auth/auth.js'

const POLICY_PRIVACY = 'https://github.com/jonaprg/UniCar-App/blob/master/docs/privacy-conditions/privacy-conditions.md'

const SignUp = ({ onSignUp, setEmail, setPassword, setName, setToggleCheckBox }) => {
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
          name='Correo electrónico'
          onChangeText={setEmail}
          placeholder='exemple@unicar.com'
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <FormPasswordInput
          name='Contraseña'
          onChangeText={setPassword}
          placeholder='*******'
          hint='Ha de tener un mínimo 6 caracteres y máximo de 20, y tener una mayúsucula. No puede contener caracteres especiales.'
        />

        <FormButton
          buttonTitle='Registrarse'
          onPress={onSignUp}
        />

        <View className='p-1 mt-3 flex  flex-row flex-wrap'>
          <Text className='text-secondary text-xs'>*Si te registras aceptas nuestras</Text>

          <TouchableOpacity onPress={() => Linking.openURL(POLICY_PRIVACY)}>
            <Text className='text-buttonColor text-xs'> políticas de privacidad</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className='justify-items-center bg-primary flex-row py-3 px-4 mt-5'
          onPress={() => dispatch(setAuthState('signIn'))}
        >
          <Text className='font-bold text-base text-gray-300'>Tienes una cuenta?</Text>
          <Text className='font-bold text-base text-white'> Inicia sesión</Text>
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
