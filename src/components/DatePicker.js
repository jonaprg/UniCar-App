import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import localization from 'moment/locale/es'
import FormButton from './FormButton.js'

const DatePickerModal = ({ dateTimeSelected, modeTime, titleButton }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    setSelectedDate(date)
    if (dateTimeSelected) {
      dateTimeSelected(date)
    }
    hideDatePicker()
  }

  return (
    <View className='flex'>

      <FormButton buttonTitle={titleButton} className='p-3 self-center ' onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={modeTime}
        locale='es-ES'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour
      />

      <Text
        className='text-sm font-medium text-black/60 text-center my-2'
      >{`${selectedDate && modeTime === 'datetime'
      ? moment(selectedDate).locale('es', localization).format('LLLL')
      : moment(selectedDate).locale('es', localization).format('LL')}`}

      </Text>
    </View>
  )
}

export default DatePickerModal
