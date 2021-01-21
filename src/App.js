import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Test} from './components/Test';

const App = () => {
  return (
    <SafeAreaView style={styles.scrollView}>
      <Test />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    flex: 1,
  },
});

export default App;
