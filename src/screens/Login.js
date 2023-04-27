/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import FormInput from '../components/FormInput.js'
import FormButton from '../components/FormButton.js'
// import SocialButton from '../components/SocialButton.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { signIn } from '../features/auth/auth.js'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  //const [token, setToken] = useState()
  const dispatch = useDispatch()

  const saveToken = async (value) => {
    try {
      await AsyncStorage.setItem('@token', value)
      dispatch(signIn(value))
      console.log('Token guardado')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ScrollView>
      <View className='flex-1 items-center justify-center bg-primary'>
        <Image source={require('../../assets/UniCarLogo.png')} className='w-64 h-64' />
        <View className='mb-10'>
          <Text className='text-4xl font-normal text-white'>Encuentra</Text>
          <Text className='text-4xl font-normal text-white'>coche rápido</Text>
          <Text className='text-4xl font-normal text-white'>y fácil</Text>
        </View>
        <FormInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder='Correo electronico'
          keyboard='email-address'
        />
        <FormInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder='Contraseña'
          secureTextEntry
        />
        <FormButton
          buttonTitle='Iniciar sesión'
          onPress={() => saveToken(email)}
        />
        <TouchableOpacity
          className='w-64 bg-buttonColor py-3 rounded-full'
          onPress={() => navigation.navigate('Signup')}
        >
          <Text className='text-center text-white'>Crear una nueva cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

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
