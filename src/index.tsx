import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {NavigationContainer} from '@react-navigation/native';
import MyStackNavigator from '@components';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
