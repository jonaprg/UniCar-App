import { Provider } from 'react-redux';
import RootNavigator from './src/navigation/RootNavigator.js';
import store from './src/app/store.js';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}