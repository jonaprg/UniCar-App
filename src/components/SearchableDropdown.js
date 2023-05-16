import React from 'react'
import { SafeAreaView, Text, View, StyleSheet } from 'react-native'
import SearchableDropdown from 'react-native-searchable-dropdown'

const SeachDropdown = ({ items, title }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {title}
        </Text>
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          // On text change listner on the searchable input
          onItemSelect={(item) => { return item }}
          // onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          // suggestion container style
          textInputStyle={{
            // inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6'
          }}
          itemStyle={{
            // single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1
          }}
          itemTextStyle={{
            // text style of a single dropdown item
            color: '#222'
          }}
          itemsContainerStyle={{
            // items container style you can pass maxHeight
            // to restrict the items dropdown hieght
            maxHeight: '60%'
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
          // To remove the underline from the android input
        />
      </View>
    </SafeAreaView>
  )
}

export default SeachDropdown

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
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
