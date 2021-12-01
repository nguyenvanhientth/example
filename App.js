import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { Toggle } from './components/Toggle';

export default function App() {
  return (
    <View style={styles.container}>
      <Toggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#bdc3c7',
    padding: 8,
  },
});