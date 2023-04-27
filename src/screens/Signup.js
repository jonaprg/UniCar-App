import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import FormInput from '../components/FormInput.js'
import FormButton from '../components/FormButton.js'

const Signup = ({ navigation }) => {
  const [email, setEmail] = React.useState()
  const [password, setPassword] = React.useState()
  const [confirmPassword, setConfirmPassword] = React.useState()
  const [university, setUniversity] = React.useState()
  const { register } = React.useContext(AuthContext)
  return (
    <ScrollView>
      <View className='flex-1 items-center justify-center bg-primary'>
        <FormInput
          value={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholder='Correo electronico'
          keyboard='email-addres'
        />
        <FormInput
          value={password}    
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholder='Contraseña'
          secureTextEntry
        />
        <FormInput
          value={password}
          onChangeText={(userConfirmPassword) => setConfirmPassword(userConfirmPassword)}
          placeholder='Contraseña'
          secureTextEntry
        />
        <FormInput
          value={password}
          onChangeText={(userUniversity) => setUniversity(userUniversity)}
          placeholder='Contraseña'
        />
        <FormButton
          buttonTitle='Iniciar sesión'
          onPress={() => register(email, password, confirmPassword, university)}
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

export default Signup
