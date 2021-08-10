/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Svg, {G} from 'react-native-svg';
import {
  VictoryPie,
  VictoryLabel,
  VictoryTooltip,
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';

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
    const BarChartData1 = [
      {x: 'Q1', y: 5},
      {x: 'Q2', y: 9},
      {x: 'Q3', y: 5},
      {x: 'Q4', y: 4},
      {x: 'Q5', y: 3},
      {x: 'Q6', y: 8},
      {x: 'Q7', y: 6},
      {x: 'Q8', y: 4},
    ];
    const BarChartData2 = [
      {x: 'Q1', y: 6},
      {x: 'Q2', y: 11},
      {x: 'Q3', y: 8},
      {x: 'Q4', y: 6},
      {x: 'Q5', y: 4},
      {x: 'Q6', y: 8},
      {x: 'Q7', y: 6},
      {x: 'Q8', y: 4},
    ];
    const colorScale = ['tomato', 'orange', 'gold', 'lightgreen', 'skyblue'];
    return (
      <SafeAreaView pointerEvents="none" style={styles.container}>
        {/* <View style={{backgroundColor: 'white'}}>
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
        </View> */}
        <View style={styles.BarChartView}>
          <Svg viewBox="0 0 400 400" width={400} height={400}>
            <VictoryChart
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPressIn: () => alert,
                  },
                },
              ]}
              containerComponent={
                <VictoryZoomContainer
                  oomDomain={{x: [1, 5], y: [0, 15]}}
                  responsive={true}
                />
              }
              width={600}
              height={400}>
              <VictoryAxis
                style={{
                  axis: {
                    fill: 'transparent',
                    stroke: '#90A4AE',
                    strokeWidth: 1,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  },
                  tickLabels: {fill: '#455A64'},
                }}
                crossAxis
                width={400}
                height={400}
                domain={[0, 10]}
                standalone={false}
                tickValues={['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8']}
              />
              <VictoryAxis
                style={{
                  axis: {strokeWidth: 0},
                  ticks: {},
                  tickLabels: {fill: '#455A64'},
                  axisLabel: {fill: '#455A64', padding: 30, fontSize: 18},
                  grid: {
                    fill: 'none',
                    stroke: '#ECEFF1',
                    strokeDasharray: [10, 5],
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    pointerEvents: 'painted',
                  },
                }}
                label="STUDENT"
                dependentAxis
                width={400}
                height={400}
                domain={[10, 0]}
                tickValues={[1, 5, 10, 15]}
                standalone={false}
              />
              <VictoryBar
                cornerRadius={6}
                domain={{x: [0, 10], y: [0, 15]}}
                barWidth={20}
                style={{data: {fill: '#0AC46B'}}}
                data={BarChartData1}
              />
              <VictoryBar
                cornerRadius={6}
                domain={{x: [0, 10], y: [0, 15]}}
                alignment="start"
                barWidth={20}
                style={{data: {fill: '#FADE5D'}}}
                data={BarChartData2}
              />
            </VictoryChart>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BarChartView: {
    width: 400,
    height: 400,
    backgroundColor: 'white',
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

export default App;
