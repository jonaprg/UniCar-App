import * as React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import MyText from '../components/MyText.js'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

import {
  setUserNameRedux,
  setUserEmailRedux,
  setUserUniversityRedux,
  setUserPhoneRedux
} from '../reducers/user.js'
import {
  updateUserName,
  updateUserEmail,
  updateUserUniversity,
  updateUserPhone
} from '../utils/userOperations.js'

export default function ProfileInfo () {
  const user = useSelector((state) => state.user)
  console.log('profileUser', user?.name)
  const navigation = useNavigation()
  const handleCarBrandEdit = (props) => {
    navigation.navigate('CarBrandEdit', props)
  }
  const handleCarColorEdit = (props) => {
    navigation.navigate('CarColorEdit', props)
  }
  const handlePreferencesEdit = (props) => {
    navigation.navigate('PreferencesEdit', props)
  }

  const renderPreferenceItem = ({ item }) => (
    <Text>{item}</Text>
  )

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
          value={user.phone ? user.phone.toString() : ''}
          canEdit
          handleUpdate={updateUserPhone}
          handleRedux={setUserPhoneRedux}
        />

        <View className='flex mt-3'>
          <View className='flex-row justify-between'>
            <View className='py-2'>
              <TouchableOpacity
                className='flex-row items-center'
                onPress={() => handleCarBrandEdit({ userId: user?.id, carBrandValue: user?.carBrand })}
              >
                <Text className='font-bold text-lg text-buttonColor mr-2'>Coche</Text>
                <AntDesign name='edit' color='black' size={18} />
              </TouchableOpacity>
              <Text>{user?.carBrand ?? 'Sin modelo'}</Text>
            </View>
            <View className='py-2'>
              <TouchableOpacity
                className='flex-row items-center'
                onPress={() => handleCarColorEdit({ userId: user?.id, carColorValue: user?.carColor })}
              >
                <Text className='font-bold text-lg text-buttonColor mr-2'>Color</Text>
                <AntDesign name='edit' color='black' size={18} />
              </TouchableOpacity>
              <Text>{user?.carColor ?? 'Sin color'}</Text>
            </View>
            <View className='py-2'>
              <Text className='text-lg font-bold '>Valoraciones</Text>
              <Text>{user?.ratings ?? 'No hay valoraciones'}</Text>
            </View>
          </View>
        </View>
        <View className='flex mt-3'>
          <View className='flex-row justify-between'>
            <View className='py-2'>
              <TouchableOpacity
                className='flex-row items-center'
                onPress={() => handlePreferencesEdit({ userId: user?.id, preferencesValues: user?.preferences })}
              >
                <Text className='font-bold text-lg text-buttonColor mr-2'>Preferencias</Text>
                <AntDesign name='edit' color='black' size={18} />
              </TouchableOpacity>

              {user?.preferences == null
                ? (
                  <Text>No hay preferencias</Text>
                  )
                : (

                  <FlatList
                    scrollEnabled={false}
                    data={user?.preferences}
                    renderItem={renderPreferenceItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  )}
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
