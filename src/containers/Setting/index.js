/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Easing, SafeAreaView, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styles from './styles';

const button_width = 300;
const button_height = 100;
const button_radius = 30;
const progress = 30;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SettingScreen = ({navigation}) => {
  const animatedProgress = useRef(0).current;
  const [length, setLength] = useState(0);
  const ref = useRef(null);

  const play = () => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 4000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    ref.current.setNativeProps({
      strokeDashoffset: length - (length * animatedProgress) / 100,
    });
  }, [animatedProgress, length]);

  return (
    <SafeAreaView style={{...styles.container, alignItems: 'center'}}>
      <Svg
        width={button_width}
        height={button_height}
        style={{backgroundColor: 'red'}}>
        <AnimatedPath
          ref={ref}
          onLayout={() => setLength(ref.current.getTotalLength())}
          d={`m ${0 + button_width / 2} 0
          l -${button_width / 2 - button_radius} 0
          q -${button_radius} 0 -${button_radius} ${button_radius}
          l 0 ${button_height - button_radius * 2}
          q 0 ${button_radius} ${button_radius} ${button_radius}
          l ${button_width - button_radius * 2} 0
          q ${button_radius} 0 ${button_radius} -${button_radius}
          l 0 -${button_height - button_radius * 2}
          q 0 -${button_radius} -${button_radius} -${button_radius}
          z
          `}
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeDasharray={length}
          strokeDashoffset={0}
        />
      </Svg>

      <Button title="Play" onPress={play} />
    </SafeAreaView>
  );
};

export default SettingScreen;
