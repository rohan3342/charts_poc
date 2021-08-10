import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import BarChart from './src/BarChart';
import PieChart from './src/PieChart';

class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <PieChart />
        <BarChart />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
