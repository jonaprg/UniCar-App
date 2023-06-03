import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setUserPreferencesRedux } from '../reducers/user.js'
import FormButton from '../components/FormButton.js'

import DropDownPicker from 'react-native-dropdown-picker'

const PreferencesEdit = ({ navigation, route }) => {
  const { userId, preferencesValues } = route.params
  const dispatch = useDispatch()

  const [openCar, setOpenCar] = useState(false)
  const [preferences, setPreferences] = useState(preferencesValues) // Agregar el estado para selectedItem
  const [dataPreferences, setDataPreferences] = useState([
    { label: 'Conversación', value: 'Conversación' },
    { label: 'Hablo mucho', value: 'Hablo mucho', parent: 'Conversación' },
    { label: 'Hablo poco', value: 'Hablo poco', parent: 'Conversación' },
    { label: 'No hablo', value: 'No hablo', parent: 'Conversación' },
    { label: 'Música', value: 'Música' },
    { label: 'Escucho de todo', value: 'Escucho de todo', parent: 'Música' },
    { label: 'No pongo música', value: 'No pongo música', parent: 'Música' },
    { label: 'Fumar', value: 'Fumar' },
    { label: 'Fumo', value: 'Fumo', parent: 'Fumar' },
    { label: 'No Fumo', value: 'No fumo', parent: 'Fumar' }
  ])

  useEffect(() => {
    setPreferences(preferencesValues)
  }, [preferencesValues])

  const handleUpdatePreferences = async () => {
    const token = await AsyncStorage.getItem('@token')
    await fetch(`http://192.168.1.33:3000/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.replace(/"/g, '')}`
      },
      body: JSON.stringify({
        preferences
      })
    }).then(response => {
      if (response.ok) {
        dispatch(setUserPreferencesRedux(preferences))
        navigation.goBack()
      } else {
        console.log('The brand car not updated')
      }
    }).catch(error => {
      console.log('The brand car update error', error)
    })
  }
  console.log('preferences', preferences)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View className='bg-secondary flex-1 justify-between  p-5'>
        <View>
          <Text className='text-2xl font-bold mb-3'>Define tus preferencias de viaje</Text>
          <DropDownPicker
            listMode='SCROLLVIEW'
            scrollViewProps={{
              nestedScrollEnabled: true
            }}
            dropDownContainerStyle={{
              position: 'relative', // to fix scroll issue ... it is by default 'absolute'
              top: 0,
              minHeight: 400// to fix gap between label box and container
            }}
            open={openCar}
            value={preferences}
            items={dataPreferences}
            itemKey='value'
            setOpen={setOpenCar}
            setValue={setPreferences}
            setItems={setDataPreferences}
            theme='DARK'
            searchable
            multiple
            categorySelectable={false}
            mode='BADGE'
            badgeDotColors={['#e76f51', '#00b4d8', '#e9c46a', '#e76f51', '#8ac926', '#00b4d8', '#e9c46a']}
            placeholder='Selecciona tus preferencias'
          />
        </View>
        <FormButton
          className='self-center'
          buttonTitle='ACTUALIZAR'
          onPress={handleUpdatePreferences}
        />

      </View>
    </KeyboardAvoidingView>
  )
}

export default PreferencesEdit

// <SeachDropdown index={carIndex} items={dataCar} title='¿Que marca de coche tienes?' onItemSelected={handleSelectedItem} />
// <SeachDropdown index={colorIndex} items={carColors} title='¿Que color de coche tienes?' onItemSelected={handleSelectedCarColor} />
