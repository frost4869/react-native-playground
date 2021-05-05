/* eslint-disable react-native/no-inline-styles */
import faker from 'faker';
import React, {useRef} from 'react';
import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Txt from '../../../components/Txt';

const item_width = 100;
const item_height = 170;
const add_button_size = 35;
const mini_item_size = 45;

const AnimatedTxt = Animated.createAnimatedComponent(Text);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
let data = [
  {
    id: null,
    backdrop: faker.image.abstract(),
  },
];

data = data.concat(
  Array.from(Array(20), (e, i) => ({
    id: faker.random.uuid(),
    avatar: faker.image.abstract(),
    backdrop: faker.image.abstract(),
    name: faker.internet.userName(),
  })),
);

const FacebookStoryList = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({item, index}) => {
    if (item.id === null) {
      return (
        <View
          style={{
            width: item_width,
            height: item_height,
            marginLeft: 6,
          }}
        />
      );
    }

    return (
      <View
        style={{
          width: item_width,
          height: item_height,
          marginLeft: 6,
          padding: 8,
          justifyContent: 'space-between',
        }}>
        <Image
          style={{
            width: item_width,
            height: item_height,
            borderRadius: 10,
            ...StyleSheet.absoluteFill,
          }}
          source={{uri: item.backdrop}}
        />
        <View
          style={{
            width: item_width,
            height: item_height,
            borderRadius: 10,
            ...StyleSheet.absoluteFill,
            backgroundColor: '#000',
            opacity: 0.3,
          }}
        />
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 25,
            overflow: 'hidden',
            borderColor: '#fff',
            borderWidth: 2,
          }}>
          <Image source={{uri: item.avatar}} style={{width: 30, height: 30}} />
        </View>
        <Txt
          style={{
            color: '#fff',
            fontSize: 10,
            fontWeight: '500',
            width: item_width - 10,
          }}
          numberOfLines={1}>
          {item.name}
        </Txt>
      </View>
    );
  };

  const width = scrollX.interpolate({
    inputRange: [-1, 0, item_width + 6],
    outputRange: [item_width, item_width, mini_item_size],
    extrapolate: 'clamp',
  });
  const height = scrollX.interpolate({
    inputRange: [-1, 0, item_width + 6],
    outputRange: [item_height, item_height, mini_item_size],
    extrapolate: 'clamp',
  });
  const backdropSize = scrollX.interpolate({
    inputRange: [-1, 0, item_width + 6],
    outputRange: [item_width, item_width, mini_item_size * 0.7],
    extrapolate: 'clamp',
  });

  const translateX = scrollX.interpolate({
    inputRange: [-1, 0, (item_width + 6) * (data.length - 1)],
    outputRange: [1, 0, -1],
  });

  const translateX2 = scrollX.interpolate({
    inputRange: [-1, 0, item_width + 6],
    outputRange: [0, 0, -6],
    extrapolate: 'clamp',
  });

  const backdropRadius = scrollX.interpolate({
    inputRange: [-1, 0, (item_width + 6) * 2],
    outputRange: [0, 0, item_width],
    extrapolate: 'clamp',
  });

  const containerPadding = scrollX.interpolate({
    inputRange: [-1, 0, item_width * 0.5],
    outputRange: [0, 0, 4],
    extrapolate: 'clamp',
  });

  const containerRightRadius = scrollX.interpolate({
    inputRange: [-1, 0, (item_width + 6) * 2],
    outputRange: [10, 10, mini_item_size / 2],
    extrapolate: 'clamp',
  });
  const containerLeftRadius = scrollX.interpolate({
    inputRange: [-1, 0, item_width + 6],
    outputRange: [10, 10, 0],
    extrapolate: 'clamp',
  });

  const textHeight = scrollX.interpolate({
    inputRange: [-1, 0, item_width + 6],
    outputRange: [0, 0, 30],
    extrapolate: 'clamp',
  });
  const textOpacity = scrollX.interpolate({
    inputRange: [-1, 0, item_width + 6],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const buttonScale = scrollX.interpolate({
    inputRange: [-1, 0, item_width + 6],
    outputRange: [1, 1, 0.4],
    extrapolate: 'clamp',
  });
  const buttonTranslateX = scrollX.interpolate({
    inputRange: [-1, 0, item_width + 6],
    outputRange: [0, 0, 20],
    extrapolate: 'clamp',
  });
  return (
    <View
      style={{
        paddingVertical: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
          useNativeDriver: false,
        })}
      />
      <Animated.View
        style={{
          width: width,
          height: height,
          marginLeft: 6,
          overflow: 'hidden',
          backgroundColor: 'whitesmoke',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          transform: [{translateX}, {translateX: translateX2}],
          padding: containerPadding,
          borderTopRightRadius: containerRightRadius,
          borderBottomRightRadius: containerRightRadius,
          borderTopLeftRadius: containerLeftRadius,
          borderBottomLeftRadius: containerLeftRadius,
        }}>
        <Animated.Image
          style={{
            width: backdropSize,
            height: backdropSize,
            borderRadius: backdropRadius,
          }}
          source={{uri: data[0].backdrop}}
        />
        <AnimatedTouchableOpacity
          style={{
            width: add_button_size,
            height: add_button_size,
            borderRadius: add_button_size / 2,
            borderColor: 'whitesmoke',
            borderWidth: 3,
            backgroundColor: '#1778F2',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -add_button_size / 2,
            transform: [{scale: buttonScale}, {translateX: buttonTranslateX}],
          }}>
          <Icon name="plus" color="white" size={20} />
        </AnimatedTouchableOpacity>
        <AnimatedTxt
          style={{
            width: item_width * 0.5,
            bottom: textHeight,
            opacity: textOpacity,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          Create story
        </AnimatedTxt>
      </Animated.View>
    </View>
  );
};

export default FacebookStoryList;
