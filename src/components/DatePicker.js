import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

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
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }

      // Format the date as per the specified options
      selectedDate = date.toLocaleString('es-ES', options)
    }
    setSelectedDate(selectedDate)
    if (dateTimeSelected) {
      dateTimeSelected(selectedDate)
    }
    hideDatePicker()
  }

  return (
    <View className='flex-row justify-between items-center my-3'>
      <TouchableOpacity
        className='w-1/2 bg-blueColor py-4 px-4 mt-4 rounded-full'
        onPress={showDatePicker}
      >
        <Text className='text-white  font-bold text-center'>
          {titleButton}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={modeTime}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour
      />
      {modeTime === 'date'
        ? (
          <Text
            className='text-xl font-bold text-blueColor mt-5 mr-3 '
          >{`${selectedDate || ''}`}
          </Text>
          )
        : (
          <Text
            className='text-xl font-bold text-blueColor mt-5 '
          >{`${selectedDate || ''}`}
          </Text>

          )}

    </View>
  )
}

export default DatePickerModal
