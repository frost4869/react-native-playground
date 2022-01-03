/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Reanimated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle, G, Line} from 'react-native-svg';
import styles from './styles';

const LINE_LENGTH = 90;
const LINE_ANGLE = 45;
const ARCH_RADIUS = 29;
const SPEED = 3000;
const TRAIL_SPEED = (ARCH_RADIUS * Math.PI * SPEED) / ((ARCH_RADIUS * 2 * Math.PI) / 3);
const AnimatedG = Reanimated.createAnimatedComponent(G);
const AnimatedLine = Reanimated.createAnimatedComponent(Line);
const AnimatedCircle = Reanimated.createAnimatedComponent(Circle);

let x, y;

const SettingScreen = ({navigation}) => {
  const [dotPos, setDotPos] = useState();
  const blackCircleRef = useRef(null);

  const animatedRotation = useRef(new Animated.Value(0)).current;
  animatedRotation.addListener(({value}) => {
    blackCircleRef?.current?.setNativeProps({
      transform: [
        {translateX: x},
        {translateY: y},
        {rotate: `${value.toString()}deg`},
        {translateX: -x},
        {translateY: -y},
      ],
    });
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      animatedRotation.removeAllListeners();
    };
  }, []);

  const play = () => {
    animatedTrailMove.value = withRepeat(withSequence(withTiming(1, {duration: SPEED})), -1, false);

    animatedTrailRotation.value = withRepeat(withTiming(1, {duration: SPEED}), -1, true);
  };

  const orgX = useDerivedValue(() => dotPos?.x || 0, [dotPos]);
  const orgY = useDerivedValue(() => dotPos?.y || 0, [dotPos]);

  const animatedTrailRotation = useSharedValue(0);
  const animatedTrailMove = useSharedValue(0);

  const onDotLayout = event => {
    const layout = event.nativeEvent.layout;
    orgX.value = layout.x + layout.width / 2;
    orgY.value = layout.y + layout.height / 2;
    setDotPos({
      x: layout.x + layout.width / 2,
      y: layout.y + layout.height / 2,
      height: layout.height,
      width: layout.width,
    });
  };

  const lineAnimatedProps = useAnimatedProps(() => {
    const angle = interpolate(animatedTrailRotation.value, [0, 1], [0, -90]);

    return {
      transform: [
        {translateX: orgX.value},
        {translateY: orgY.value},
        {
          rotate: (angle * Math.PI) / 180,
        },
        {translateX: -orgX.value},
        {translateY: -orgY.value},
      ],
    };
  }, [orgX, orgY]);

  const trailAnimatedProps = useAnimatedProps(() => {
    const length = interpolate(animatedTrailRotation.value, [0, 0.5, 1], [-4, -3.5, -4]);

    return {
      strokeDashoffset: ((ARCH_RADIUS * 3 * 2 * Math.PI) / 4) * length,
    };
  }, [orgX, orgY]);

  const trailAnimatedStyle = useAnimatedStyle(() => {
    // const angle = interpolate(animatedTrailRotation.value, [0, 0.5, 1], [-45, -45, -135]);
    const angle = interpolate(animatedTrailMove.value, [0, 1], [-45, -135]);
    // console.log('angle :>> ', angle);
    return {
      transform: [
        {translateX: orgX.value},
        {translateY: orgY.value},
        {
          rotate: (angle * Math.PI) / 180,
        },
        {translateX: -orgX.value},
        {translateY: -orgY.value},
      ],
    };
  }, [orgX, orgY]);

  const redDotAnimatedProps = useAnimatedProps(() => {
    const angle = interpolate(animatedTrailRotation.value, [0, 1], [45, 135]);

    return {
      cx: orgX.value + LINE_LENGTH * Math.cos((angle * Math.PI) / 180),
      cy: orgY.value - LINE_LENGTH * Math.sin((angle * Math.PI) / 180),
    };
  }, [orgX, orgY]);

  const yellowDotAnimatedProps = useAnimatedProps(() => {
    const angle = interpolate(animatedTrailRotation.value, [0, 0.5, 1], [45, 45, 135]);

    return {
      cx: orgX.value + ARCH_RADIUS * 2 * Math.cos((angle * Math.PI) / 180),
      cy: orgY.value - ARCH_RADIUS * 2 * Math.sin((angle * Math.PI) / 180),
    };
  }, [orgX, orgY]);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
      }}>
      <TouchableOpacity onPress={play} style={styles.button}>
        <View style={styles.dot} onLayout={onDotLayout} />

        <Svg style={{width: '100%', height: '100%'}}>
          {dotPos && (
            <>
              {Array.from(Array(3), (e, i) => {
                const radiusScale = ARCH_RADIUS * (i + 1);

                return (
                  <>
                    <Circle
                      key={i}
                      cx={dotPos.x}
                      cy={dotPos.y}
                      r={radiusScale}
                      stroke="#a1a1a1"
                      strokeLinecap="round"
                      rotation={-45}
                      strokeWidth={12}
                      strokeDasharray={radiusScale * 2 * Math.PI}
                      strokeDashoffset={((radiusScale * 2 * Math.PI) / 4) * -3}
                      originX={dotPos.x}
                      originY={dotPos.y}
                    />
                  </>
                );
              })}

              <AnimatedCircle
                cx={dotPos.x}
                cy={dotPos.y}
                r={ARCH_RADIUS * 3}
                stroke="black"
                strokeLinecap="round"
                // rotation={-135} // [-45 , -135]
                strokeWidth={12}
                strokeDasharray={ARCH_RADIUS * 3 * 2 * Math.PI}
                // strokeDashoffset={((ARCH_RADIUS * 2 * 2 * Math.PI) / 4) * -4} // [-3.5, -4]
                originX={dotPos.x}
                originY={dotPos.y}
                animatedProps={trailAnimatedProps}
                style={trailAnimatedStyle}
              />

              {/* <AnimatedLine
                x1={dotPos.x}
                y1={dotPos.y}
                x2={dotPos.x + LINE_LENGTH * Math.cos((LINE_ANGLE * Math.PI) / 180)}
                y2={dotPos.y - LINE_LENGTH * Math.sin((LINE_ANGLE * Math.PI) / 180)}
                stroke="black"
                strokeWidth={12}
                strokeLinecap="round"
                animatedProps={lineAnimatedProps}
              /> */}

              {/* <AnimatedCircle r={4} fill="red" animatedProps={redDotAnimatedProps} />
              <AnimatedCircle r={4} fill="yellow" animatedProps={yellowDotAnimatedProps} /> */}
            </>
          )}
        </Svg>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingScreen;
