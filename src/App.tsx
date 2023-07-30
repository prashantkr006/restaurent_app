import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './store/store';
import MainNavigator from './navigation/MainNavigator';
import {StatusBar, StyleSheet, View} from 'react-native';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // Set your desired background color here
  },
});

export default App;
