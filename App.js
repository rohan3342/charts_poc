/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Text,
} from 'react-native';
import Svg, {G} from 'react-native-svg';
import {VictoryPie, VictoryLabel, VictoryTooltip} from 'victory-native';

const CustomLabel = props => {
  const width = props?.textStyle?.width;
  const x = props.x - width / 2;
  const y = props.y - width / 2;
  console.log('\n', props.datum, '\n Positions => X: ', x, ' Y: ', y);
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        height: props?.textStyle?.height + 5,
        width: props?.textStyle?.width + 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
      }}>
      <Text style={[props.textStyle, {borderColor: props?.datum?.fill}]}>
        {props?.text}
      </Text>
    </View>
  );
};

class App extends Component {
  render() {
    const SampleData = [
      {x: '5', y: 5, fill: 'tomato'},
      {x: '10', y: 10, fill: 'orange'},
      {x: '5', y: 5, fill: 'gold'},
      {x: '4', y: 4, fill: 'lightgreen'},
      {x: '6', y: 6, fill: 'skyblue'},
    ];
    const colorScale = ['tomato', 'orange', 'gold', 'lightgreen', 'skyblue'];
    return (
      <SafeAreaView pointerEvents="none" style={styles.container}>
        <View style={{backgroundColor: 'white'}}>
          <Svg viewBox="0 0 400 400" width={400} height={400}>
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              data={SampleData}
              colorScale={colorScale}
              innerRadius={100}
              labelRadius={150}
              labelComponent={<CustomLabel textStyle={styles.customLabel} />}
              style={{labels: {fontSize: 20, fill: 'white'}}}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          target: 'data',
                          mutation: dataProps => {
                            console.log('item selected is', dataProps.index);
                            return {};
                          },
                        },
                      ];
                    },
                    onPressOut: () => {},
                  },
                },
              ]}
            />
            <VictoryLabel textComponent={<CenterLabel text={'30'} />} text="" />
          </Svg>
        </View>
      </SafeAreaView>
    );
  }
}

const CenterLabel = props => (
  <View
    style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
    <Text style={{fontSize: 28, color: 'black'}}>{props.text}</Text>
    <Text style={{color: 'grey'}}>Total Students</Text>
  </View>
);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customLabel: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    fontSize: 12,
    textAlign: 'center',
    borderRadius: 30,
    textAlignVertical: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'red',
  },
});
