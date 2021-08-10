import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryZoomContainer,
} from 'victory-native';

const BarChart = () => {
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
  return (
    <View style={styles.BarChartView}>
      <VictoryChart
        containerComponent={
          <VictoryZoomContainer
            zoomDomain={{x: [1, 3], y: [0, 15]}}
            responsive={true}
          />
        }
        width={400}
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
    </View>
  );
};

const styles = StyleSheet.create({
  BarChartView: {
    width: 400,
    height: 400,
    backgroundColor: 'white',
  },
});

export default BarChart;
