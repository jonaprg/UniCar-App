import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setUserCarColorRedux } from '../reducers/user.js'
import FormButton from '../components/FormButton.js'

import DropDownPicker from 'react-native-dropdown-picker'
import Toast from 'react-native-toast-message'

const CarColorEdit = ({ navigation, route }) => {
  const { userId, carColorValue } = route.params
  const dispatch = useDispatch()

  const [openColor, setOpenColor] = useState(false)
  const [carColor, setCarColor] = useState(null)
  const [dataColorCar, setDataColorCar] = useState([
    { label: 'Rojo', value: 'Rojo' },
    { label: 'Azul', value: 'Azul' },
    { label: 'Blanco', value: 'Blanco' },
    { label: 'Negro', value: 'Negro' },
    { label: 'Plateado', value: 'Plateado' },
    { label: 'Gris', value: 'Gris' },
    { label: 'Verde', value: 'Verde' },
    { label: 'Amarillo', value: 'Amarillo' },
    { label: 'Naranja', value: 'Naranja' },
    { label: 'Morado', value: 'Morado' }
  ])

  useEffect(() => {
    setCarColor(carColorValue)
  }, [carColorValue])

  const handleUpdateCarColor = async () => {
    const token = await AsyncStorage.getItem('@token')
    await fetch(`http://192.168.1.41:3000/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/"/g, '')}`
      },
      body: JSON.stringify({
        carColor
      })
    }).then(response => {
      if (response.status === 200) {
        dispatch(setUserCarColorRedux(carColor))
        Toast.show({
          type: 'success',
          text1: 'Color del coche actualizada.'
        })
        navigation.goBack()
      } else {
        Toast.show({
          type: 'error',
          text1: 'El color de coche no se ha actualizado.'
        })
      }
    }).catch(error => {
      console.log('ERROR - The color car not updated', error)
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View className='bg-secondary flex-1 align-middle justify-between  p-5'>
        <View className='z-10'>
          <Text className='text-2xl font-bold'>Editar color</Text>
          <DropDownPicker
            listMode='SCROLLVIEW'
            scrollViewProps={{
              nestedScrollEnabled: true
            }}
            dropDownContainerStyle={{
              position: 'relative', // to fix scroll issue ... it is by default 'absolute'
              top: 0,
              minHeight: 350// to fix gap between label box and container
            }}
            open={openColor}
            value={carColor}
            items={dataColorCar}
            itemKey='value'
            setOpen={setOpenColor}
            setValue={setCarColor}
            setItems={setDataColorCar}
            theme='DARK'
            searchable
          />
        </View>
        <FormButton
          className='self-center'
          buttonTitle='ACTUALIZAR'
          onPress={handleUpdateCarColor}
        />

      </View>
    </KeyboardAvoidingView>
  )
}

export default CarColorEdit
