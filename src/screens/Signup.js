import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import FormInput from '../components/FormInput.js'
import FormButton from '../components/FormButton.js'
import { setAuthState } from '../features/auth/auth.js'

const SignUp = ({ onSignUp, setEmail, setPassword, setName, setUniversity }) => {
  // const [university, setUniversity] = useState()

  const dispatch = useDispatch()

  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Image source={require('../../assets/UniCarLogo.png')} className='w-64 h-64' />

      <FormInput
        name='Nombre'
        onChangeText={setName}
        placeholder='Correo electronico'
      />
      <FormInput
        name='Correo electronico'
        onChangeText={setEmail}
        placeholder='Correo electronico'
        keyboard='email-address'
      />
      <FormInput
        name='Universidad'
        onChangeText={setUniversity}
        placeholder='Universidad'
      />
      <FormInput
        name='Contraseña'
        onChangeText={setPassword}
        placeholder='Contraseña'
        secureTextEntry
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

  )
}

export default SignUp

/* <FormInput
    value={university}
    onChangeText={(userUniversity) => setUniversity(userUniversity)}
    placeholder='Contraseña' />
*/
