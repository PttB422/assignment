import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Assignment from './src/Assignment';
import {AppProvider} from './src/context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <Assignment />
      </SafeAreaView>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
