import React, {Children, cloneElement, useEffect, useRef} from 'react';
import {Animated, Dimensions, ScrollView} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const AnimatedList = ({children}) => {
  let animatedValueList = [];
  children.forEach(() => {
    animatedValueList.push(useRef(new Animated.Value(SCREEN_WIDTH)).current);
  });

  useEffect(() => {
    const animationList = animatedValueList.map((item) =>
      Animated.timing(item, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    );
    Animated.stagger(50, animationList).start();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      {Children.map(children, (item, index) => {
        return (
          <Animated.View
            style={{
              transform: [{translateX: animatedValueList[index]}],
            }}>
            {cloneElement(item)}
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

export default AnimatedList;
