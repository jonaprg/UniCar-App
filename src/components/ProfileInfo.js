import * as React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import MyText from '../components/MyText.js'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

import {
  setUserNameRedux,
  setUserEmailRedux,
  setUserUniversityRedux,
  setUserPhoneRredux
} from '../reducers/user.js'
import {
  updateUserName,
  updateUserEmail,
  updateUserUniversity,
  updateUserPhone
} from '../utils/userOperations.js'

export default function ProfileInfo () {
  const user = useSelector((state) => state.user)
  console.log('profileUser', user)
  const navigation = useNavigation()
  const handleCarEdit = () => {
    navigation.navigate('CarEdit')
  }
  return (
    <View>
      <View className='px-5'>
        <Text className='text-lg font-bold '>Información</Text>
        <InfoField
          label='Nombre'
          value={user?.name}
          canEdit
          handleUpdate={updateUserName}
          handleRedux={setUserNameRedux}
        />
        <InfoField
          label='Correo electronico'
          value={user?.email}
          canEdit
          handleUpdate={updateUserEmail}
          handleRedux={setUserEmailRedux}
        />
        <InfoField
          label='Universidad'
          value={user.university}
          canEdit
          handleUpdate={updateUserUniversity}
          handleRedux={setUserUniversityRedux}
        />
        <InfoField
          label='Telefono'
          value={user.phone}
          canEdit
          handleUpdate={updateUserPhone}
          handleRedux={setUserPhoneRredux}
        />

        <View className='flex mt-3'>
          <View className='flex-row justify-between'>
            <View className='py-2'>
              <TouchableOpacity
                className='flex-row items-center'
                onPress={() => handleCarEdit()}
              >
                <Text className='font-bold text-lg text-errorColor mr-2'>Coche</Text>
                <FontAwesome name='edit' color='red' size={20} />
              </TouchableOpacity>
              <Text>{user?.carModel ?? 'Sin modelo'}</Text>
              <Text>{user?.carModel ?? 'Sin color'}</Text>
            </View>
            <View className='py-2' />
            <View className='py-2'>
              <Text className='text-lg font-bold '>Valoraciones</Text>
              <Text>{user?.valoracion ?? 'No hay valoraciones'}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

function InfoField ({
  label,
  value,
  canEdit,
  handleUpdate,
  handleRedux
}) {
  const { id } = useSelector((state) => state.user)
  const [localValue, setLocalValue] = React.useState(value)
  const dispatch = useDispatch()
  return (
    <View style={styles.fieldContainer}>
      <MyText
        className='text-buttonColor'
        type='caption'
        style={{
          fontWeight: '500',
          paddingRight: 10
        }}
      >
        {label}
      </MyText>
      <TextInput
        placeholder={label}
        value={localValue}
        onChangeText={canEdit && setLocalValue}
        keyboardType={canEdit ? 'web-search' : 'default'}
        onSubmitEditing={(event) => {
          canEdit && handleUpdate(id, event.nativeEvent.text)
          canEdit && dispatch(handleRedux(event.nativeEvent.text))
        }}
        style={{ fontWeight: '500', color: 'black', textAlign: 'right' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10
  }
})
