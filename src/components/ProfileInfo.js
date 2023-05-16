import * as React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import MyText from '../components/MyText.js'
import { useSelector, useDispatch } from 'react-redux'
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
} from '../utils/userOperations'

export default function ProfilePicture () {
  const user = useSelector((state) => state.user)
  return (
    <View>
      <View className='border-b flex py-5 px-5 flex-row flex-wrap'>
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
          value={user?.univesity}
          canEdit
          handleUpdate={updateUserUniversity}
          handleRedux={setUserUniversityRedux}
        />
        <InfoField
          label='Telefono'
          value={user?.phone}
          canEdit
          handleUpdate={updateUserPhone}
          handleRedux={setUserPhoneRredux}
        />

        <View className=' px-2 py-2'>
          <Text className='text-lg font-bold '>Valoraciones</Text>
          <Text>{user?.valoracion ?? 'No hay valoraciones'}</Text>
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
        value={localValue ?? 'No hay información'}
        onChangeText={canEdit && setLocalValue}
        keyboardType={canEdit ? 'web-search' : 'default'}
        onSubmitEditing={(event) => {
          canEdit && handleUpdate(id, event.nativeEvent.text)
          canEdit && dispatch(handleRedux(event.nativeEvent.text))
        }}
        style={{ fontWeight: '500', color: 'black', flexShrink: 1 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15
  }
})
