import React, { useState, useEffect } from 'react'
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setUserCarBrandRedux } from '../reducers/user.js'
import FormButton from '../components/FormButton.js'

import DropDownPicker from 'react-native-dropdown-picker'

const CarBrandEdit = ({ navigation, route }) => {
  const { userId, carBrandValue } = route.params
  const dispatch = useDispatch()

  const [openCar, setOpenCar] = useState(false)
  const [newBrandCar, setBrandCar] = useState(carBrandValue) // Agregar el estado para selectedItem
  const [dataBrandCar, setDataBrandCar] = useState([
    { label: 'Audi', value: 'Audi' },
    { label: 'Mercedes', value: 'Mercedes' },
    { label: 'Bmw', value: 'Bmw' },
    { label: 'Lexus', value: 'Lexus' },
    { label: 'Toyota', value: 'Toyota' },
    { label: 'Honda', value: 'Honda' },
    { label: 'Hyundai', value: 'Hyundai' },
    { label: 'Ferrari', value: 'Ferrari' },
    { label: 'Jaguar', value: 'Jaguar' },
    { label: 'Volvo', value: 'Volvo' },
    { label: 'Ford', value: 'Ford' },
    { label: 'Chevrolet', value: 'Chevrolet' },
    { label: 'Tesla', value: 'Tesla' }
  ])

  useEffect(() => {
    setBrandCar(carBrandValue)
  }, [carBrandValue])

  const handleUpdateCarBrand = async () => {
    const token = await AsyncStorage.getItem('@token')
    await fetch(`http://192.168.1.33:3000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/"/g, '')}`
      },
      body: JSON.stringify({
        carBrand: newBrandCar
      })
    }).then(response => {
      if (response.ok) {
        dispatch(setUserCarBrandRedux(newBrandCar))
        navigation.goBack()
      } else {
        console.log('The brand car not updated')
      }
    }).catch(error => {
      console.log('The brand car update error', error)
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View className='bg-secondary flex-1 justify-between  p-5'>
        <View>
          <Text className='text-2xl font-bold mb-3'>¿Que marca de coche tienes?</Text>
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
            open={openCar}
            value={newBrandCar}
            items={dataBrandCar}
            itemKey='value'
            setOpen={setOpenCar}
            setValue={setBrandCar}
            setItems={setDataBrandCar}
            theme='DARK'
            searchable
          />
        </View>
        <FormButton
          className='self-center'
          buttonTitle='ACTUALIZAR'
          onPress={handleUpdateCarBrand}
        />

      </View>
    </KeyboardAvoidingView>
  )
}

export default CarBrandEdit

// <SeachDropdown index={carIndex} items={dataCar} title='¿Que marca de coche tienes?' onItemSelected={handleSelectedItem} />
// <SeachDropdown index={colorIndex} items={carColors} title='¿Que color de coche tienes?' onItemSelected={handleSelectedCarColor} />
