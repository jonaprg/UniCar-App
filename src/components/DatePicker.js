import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
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
    <View className='flex flex-row justify-between items-center '>
      <Text className=''>{`Fecha:  ${selectedDate ? moment(selectedDate).format('MM/DD/YYYY') : 'MM/DD/YYYY'}`}</Text>
      <FormButton buttonTitle='Escoge el día' className='w-1/2 p-3 ' onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}

export default DatePickerModal
