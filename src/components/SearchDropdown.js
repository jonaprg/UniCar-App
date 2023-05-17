import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert } from 'react-native'
import SearchableDropdown from 'react-native-searchable-dropdown'

// Items array for the dropdown. The list contains brand of cars.
const items = [
  { id: 1, name: 'audi' },
  { id: 2, name: 'mercedes' },
  { id: 3, name: 'bmw' },
  { id: 4, name: 'lexus' },
  { id: 5, name: 'toyota' },
  { id: 6, name: 'honda' },
  { id: 7, name: 'hyundai' },
  { id: 8, name: 'ferrari' },
  { id: 9, name: 'jaguar' },
  { id: 10, name: 'volvo' },
  { id: 11, name: 'ford' },
  { id: 12, name: 'chevrolet' },
  { id: 13, name: 'tesla' }
]

const SeachDropdown = () => {
  return (
    <SafeAreaView className=' '>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Coche
        </Text>
        <SearchableDropdown
          onTextChange={(text) => console.log('text', text)}
          // On text change listner on the searchable input
          onItemSelect={(item) => Alert.alert(JSON.stringify(item))}
          // onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          // suggestion container style
          textInputStyle={{
            // inserted text style
            padding: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6'
          }}
          itemStyle={{
            // single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8'

          }}
          itemTextStyle={{
            // text style of a single dropdown item
            color: '#222'
          }}
          itemsContainerStyle={{
            // items container style you can pass maxHeight
            // to restrict the items dropdown hieght
            maxHeight: '100%'
          }}
          items={items}
          // mapping of item array
          defaultIndex={2}
          // default selected item index
          placeholder='placeholder'
          // place holder for the search input
          resetValue={false}
          // reset textInput Value with true and false state
          underlineColorAndroid='transparent'
        />
      </View>
    </SafeAreaView>
  )
}

export default SeachDropdown

const styles = StyleSheet.create({

  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  headingText: {
    padding: 8
  }
})
