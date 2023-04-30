import { ActivityIndicator, Text, View } from 'react-native'

const Splash = () => {
  return (
    <View>
      <Text>Loading...</Text>
      <ActivityIndicator size='large' />
    </View>
  )
}

export default Splash
