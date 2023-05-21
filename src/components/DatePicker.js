import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import localization from 'moment/locale/es'
import FormButton from './FormButton.js'

const DatePickerModal = () => {
  const [selectedDate, setSelectedDate] = useState()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    setSelectedDate(date)
    hideDatePicker()
  }

  return (
    <View className='flex'>

      <FormButton buttonTitle='Escoge el día y la hora' className='p-3 self-center ' onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='datetime'
        locale='es-ES'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour
      />

      <Text
        className='text-sm font-medium text-black/60 text-center mt-2'
      >{`${selectedDate ? moment(selectedDate).locale('es', localization).format('LLLL') : ''}`}
      </Text>
    </View>
  )
}

export default DatePickerModal
