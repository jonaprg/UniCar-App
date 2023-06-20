import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import FormButton from './FormButton.js'

const DatePickerModal = ({ dateTimeSelected, modeTime, titleButton }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    let selectedDate
    if (modeTime === 'date') {
      selectedDate = date.toLocaleDateString('es-ES')
    } else {
      selectedDate = date.toLocaleString('es-ES')
    }

    setSelectedDate(selectedDate)
    if (dateTimeSelected) {
      dateTimeSelected(selectedDate)
    }
    hideDatePicker()
  }

  return (
    <View className='flex'>

      <FormButton buttonTitle={titleButton} className='p-3 self-center ' onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={modeTime}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour
      />

      <Text
        className='text-sm font-medium text-black/60 text-center my-2'
      >{`${selectedDate || ''}`}

      </Text>
    </View>
  )
}

export default DatePickerModal
