import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import FormInput from '../components/FormInput.js'
import FormButton from '../components/FormButton.js'
import { setAuthState } from '../features/auth/auth.js'

const SignUp = ({ onSignUp, setEmail, setPassword }) => {
  // const [university, setUniversity] = useState()

  const dispatch = useDispatch()

  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <FormInput
        name='Correo electronico'
        onChangeText={setEmail}
        placeholder='Correo electronico'
        keyboard='email-address'
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
        className='w-64 bg-buttonColor py-3 rounded-full'
        onPress={() => dispatch(setAuthState('signIn'))}
      >
        <Text className='text-center text-white'>Inicia sesión</Text>
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
