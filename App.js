import React from 'react';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './Navigations/StackNavigator';

export default function App() {
  return (
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
