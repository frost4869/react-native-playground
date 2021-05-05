/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, Slider, View} from 'react-native';
import Svg, {Circle, Line} from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';
import Txt from '../../components/Txt';
import Intro from './intro';
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const BUTTON_WIDTH = SCREEN_WIDTH * 0.7;
const BUTTON_HEIGHT = BUTTON_WIDTH * 0.7;
const CIRCLE_DIAMETER = Math.sqrt(Math.pow(BUTTON_HEIGHT, 2) + Math.pow(BUTTON_WIDTH, 2));
const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;

const HokkaidoChallenge = ({navigation}) => {
  const [centerCoord, setCenterCoord] = useState({x: 0, y: 0});
  const [buttonCoord, setButtonCoord] = useState({
    topLeft: {x: 0, y: 0},
    topRight: {x: 0, y: 0},
    bottomLeft: {x: 0, y: 0},
    bottomRight: {x: 0, y: 0},
  });
  const [pointAmount, setPointAmount] = useState(100);

  const onLayoutCenterPoint = (event) => {
    const {x, y} = event.nativeEvent.layout;
    setCenterCoord({x, y});
  };

  const intersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }

    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    // Lines are parallel
    if (denominator === 0) {
      return false;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    return {x, y};
  };

  const points = Array.from(Array(pointAmount), (e, i) => {
    const degree = (i * 360) / pointAmount;
    const radian = (degree * Math.PI) / 180;

    const {topLeft, topRight, bottomLeft, bottomRight} = buttonCoord;

    const pointX = centerCoord.x - CIRCLE_RADIUS * Math.sin(radian);
    const pointY = centerCoord.y - CIRCLE_RADIUS * Math.cos(radian);
    const line = {
      x1: pointX,
      y1: pointY,
      x2: centerCoord.x,
      y2: centerCoord.y,
    };
    const slope = (line.y1 - line.y2) / (line.x1 - line.x2);
    let intersectPoint = {x: 0, y: 0};
    if (
      -BUTTON_HEIGHT / 2 <= (slope * BUTTON_WIDTH) / 2 &&
      (slope * BUTTON_WIDTH) / 2 <= BUTTON_HEIGHT / 2
    ) {
      // hit right edge
      if (line.x1 > line.x2) {
        intersectPoint = intersect(
          topRight.x,
          topRight.y,
          bottomRight.x,
          bottomRight.y,
          centerCoord.x,
          centerCoord.y,
          pointX,
          pointY,
        );
      }
      // hit left edge
      if (line.x1 < line.x2) {
        intersectPoint = intersect(
          topLeft.x,
          topLeft.y,
          bottomLeft.x,
          bottomLeft.y,
          centerCoord.x,
          centerCoord.y,
          pointX,
          pointY,
        );
      }
    } else if (
      -BUTTON_WIDTH / 2 <= BUTTON_HEIGHT / 2 / slope &&
      BUTTON_HEIGHT / 2 / slope <= BUTTON_WIDTH / 2
    ) {
      // hit top edge
      if (line.y1 < line.y2) {
        intersectPoint = intersect(
          topLeft.x,
          topLeft.y,
          topRight.x,
          topRight.y,
          centerCoord.x,
          centerCoord.y,
          pointX,
          pointY,
        );
      }
      // hit bototm edge
      if (line.y1 > line.y2) {
        intersectPoint = intersect(
          bottomLeft.x,
          bottomLeft.y,
          bottomRight.x,
          bottomRight.y,
          centerCoord.x,
          centerCoord.y,
          pointX,
          pointY,
        );
      }
    }
    return {
      x: pointX,
      y: pointY,
      intersectPoint,
    };
  });

  const onLayoutButton = (event) => {
    const {x, y} = event.nativeEvent.layout;
    setButtonCoord({
      topLeft: {x, y},
      topRight: {x: x + BUTTON_WIDTH, y},
      bottomLeft: {x, y: y + BUTTON_HEIGHT},
      bottomRight: {x: x + BUTTON_WIDTH, y: y + BUTTON_HEIGHT},
    });
  };

  const onSliderValueChanged = (value) => {
    setPointAmount(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Hokaido challenge"
        onBack={() => {
          navigation.pop();
        }}
        style={styles.header}
      />
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        <Intro />
        <View
          style={{
            width: CIRCLE_DIAMETER,
            height: CIRCLE_DIAMETER,
            borderRadius: CIRCLE_RADIUS,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* button */}
          <View
            style={{
              width: BUTTON_WIDTH,
              height: BUTTON_HEIGHT,
              backgroundColor: 'pink',
              position: 'absolute',
            }}
            onLayout={onLayoutButton}
          />
          {/* center point */}
          <View style={{position: 'absolute'}} onLayout={onLayoutCenterPoint} />

          <Svg width={CIRCLE_DIAMETER} height={CIRCLE_DIAMETER} style={{position: 'absolute'}}>
            <Circle cx={centerCoord.x} cy={centerCoord.y} r="4" fill="red" />
            {points.map((item, index) => (
              <>
                <Circle cx={item.x} cy={item.y} r={3} fill="red" key={`c-${index}`} />
                {item.intersectPoint && (
                  <Circle
                    cx={item.intersectPoint.x}
                    cy={item.intersectPoint.y}
                    r={4}
                    fill="cyan"
                    key={index}
                  />
                )}
                <Line
                  x1={item.x}
                  y1={item.y}
                  x2={centerCoord.x}
                  y2={centerCoord.y}
                  stroke="black"
                  strokeWidth={1}
                />
              </>
            ))}
          </Svg>
        </View>

        {/* slider */}
        <Txt style={styles.text}>Slide me</Txt>
        <Slider
          minimumValue={1}
          maximumValue={100}
          onValueChange={onSliderValueChanged}
          step={1}
          value={100}
          style={styles.slider}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HokkaidoChallenge;
