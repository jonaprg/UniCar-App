import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const GooglePlacesInput = ({ placeholder, onPlaceSelected }) => {
  const handlePlaceSelected = (data, details = null) => {
    if (onPlaceSelected) {
      onPlaceSelected(data.terms[0].value)
    }
  }
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        renderDescription={(row) => row.terms[0].value}
        query={{
          key: 'AIzaSyB8QVDHbOzPSl4KGa49po4xH54wZC3PbOg',
          language: 'es',
          components: 'country:es'
        }}
        onPress={handlePlaceSelected}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web'
        }}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    margin: 0
  }
})

export default GooglePlacesInput
