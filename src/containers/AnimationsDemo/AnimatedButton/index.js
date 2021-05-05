/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import * as Property from 'svg-path-properties';
import ScreenHeader from '../../../components/ScreenHeader';
import Txt from '../../../components/Txt';
import styles from './styles';

const button_width = 300;
const button_height = 100;
const button_radius = 8;
const progress = 80;
const strokeWidth = 5;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const path = `m ${button_width / 2} 0
    l -${button_width / 2 - button_radius} 0
    q -${button_radius} 0 -${button_radius} ${button_radius}
    l 0 ${button_height - button_radius * 2}
    q 0 ${button_radius} ${button_radius} ${button_radius}
    l ${button_width - button_radius * 2} 0
    q ${button_radius} 0 ${button_radius} -${button_radius}
    l 0 -${button_height - button_radius * 2}
    q 0 -${button_radius} -${button_radius} -${button_radius}
    z`;

const property = new Property.svgPathProperties(path);
const lineLength = property.getTotalLength();

const AnimatedButton = ({navigation}) => {
  const animatedProgress = useRef(new Animated.Value(lineLength)).current;
  const [percent, setPercent] = useState(0);
  const ref = useRef(null);
  const labelRef = useRef(button_width / 2);

  animatedProgress.addListener((data) => {
    setPercent((((lineLength - data.value) * 100) / lineLength).toFixed(0));
    const {x, y} = property.getPointAtLength(lineLength - data.value);
    labelRef.current.setNativeProps({
      top: y - 10,
      left: x - 25,
    });
  });

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: lineLength - (lineLength * progress) / 100,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Animated Button"
        onBack={() => {
          navigation.pop();
        }}
        style={styles.header}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => alert('pressed')}
          activeOpacity={0.8}
          style={{
            backgroundColor: 'pink',
            borderRadius: button_radius,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Svg width={button_width + strokeWidth} height={button_height + strokeWidth}>
            <AnimatedPath
              ref={ref}
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              d={path}
              fill="none"
              stroke="#fff"
              strokeWidth={strokeWidth}
              strokeDasharray={lineLength}
              strokeDashoffset={animatedProgress}
            />
            <View
              ref={labelRef}
              style={{
                width: 50,
                height: 20,
                padding: 4,
                backgroundColor: '#fff',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Txt style={{fontSize: 11, fontWeight: '400'}}>{percent} %</Txt>
            </View>
          </Svg>
          <Txt style={{position: 'absolute'}}>Press plz</Txt>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AnimatedButton;
