/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Svg from 'react-native-svg';
import {VictoryPie, VictoryLabel} from 'victory-native';

const ColorScale = ['#3BA2FB', '#FADE5D', '#EB5D04'];
const LegendData = [
  {
    color: '#3BA2FB',
    data: 'Completed',
  },
  {
    color: '#FADE5D',
    data: 'Not Completed',
  },
  {
    color: '#EB5D04',
    data: 'Not Attempted',
  },
];
const MockData = [
  {x: '20', y: 20, fill: '#3BA2FB'},
  {x: '11', y: 11, fill: '#FADE5D'},
  {x: '3', y: 3, fill: '#C36432'},
];

const PieChart = () => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const ScaleRadius = data => {
    const {innerRadius, index} = data;
    if (
      innerRadius === 100 &&
      (currentIndex === index || currentIndex === null)
    ) {
      setCurrentIndex(index);
      return {innerRadius: 96, radius: 154};
    } else if (currentIndex === index) {
      setCurrentIndex(null);
      return {innerRadius: 100, radius: 150};
    }
  };

  const width = 380,
    height = 380;
  return (
    <View style={styles.container}>
      <View style={styles.legendsView}>
        {_.map(LegendData, (el, index) => (
          <View key={index} style={styles.legendsElView}>
            <View style={[styles.legendCircleView, {borderColor: el.color}]} />
            <Text style={styles.legendText}>{el.data}</Text>
          </View>
        ))}
      </View>
      <Svg width={width} height={height}>
        <VictoryPie
          standalone={false}
          width={width}
          height={height}
          data={MockData}
          colorScale={ColorScale}
          innerRadius={100}
          labelRadius={150}
          radius={150}
          labelComponent={<CustomLabel textStyle={styles.customLabelText} />}
          style={{labels: {fontSize: 20, fill: 'white'}}}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: 'data',
                      mutation: props => ScaleRadius(props),
                    },
                  ];
                },
              },
            },
          ]}
        />
        <VictoryLabel textComponent={<CenterLabel text={'30'} />} text="" />
      </Svg>
    </View>
  );
};

const CustomLabel = props => {
  const width = props?.textStyle?.width;
  const x = props.x - width / 2;
  const y = props.y - width / 2;
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        height: width + 6,
        width: width + 6,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width + 6 / 2,
      }}>
      <Text style={[props.textStyle, {borderColor: props?.datum?.fill}]}>
        {props?.text}
      </Text>
    </View>
  );
};

const CenterLabel = props => (
  <View style={styles.centerLabelView}>
    <Text style={styles.centerLabelText}>{props.text}</Text>
    <Text style={styles.centerLabelSubText}>Total Students</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
  legendsView: {
    marginTop: 20,
    height: 13,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  legendsElView: {
    height: 13,
    flexDirection: 'row',
  },
  legendCircleView: {
    backgroundColor: 'white',
    borderWidth: 3,
    height: 13,
    width: 13,
    borderRadius: 12,
    marginRight: 5,
  },
  legendText: {
    fontSize: 11,
    color: 'rgba(65, 65, 65, 0.7)',
  },
  customLabelText: {
    backgroundColor: 'white',
    height: 46,
    width: 46,
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 30,
    textAlignVertical: 'center',
    marginVertical: 10,
    borderWidth: 2,
    color: '#3A304A',
  },
  centerLabelView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  centerLabelText: {
    fontSize: 28,
    color: 'black',
  },
  centerLabelSubText: {
    color: 'grey',
  },
});

export default PieChart;
