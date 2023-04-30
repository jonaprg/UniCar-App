import { Provider } from 'react-redux'
import RootNavigator from './src/navigation/RootNavigator.js'
import store from './src/app/store.js'
import { LogBox } from 'react-native'
LogBox.ignoreLogs(['AsyncStorage'])

export default function App () {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  )
}
