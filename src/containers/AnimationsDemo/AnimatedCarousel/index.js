/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.7;
const IMAGE_HEIGHT = (IMAGE_WIDTH * 16) / 9;

const data = [
  {
    id: 1,
    name: 'Pontiac',
    subtitle: 'Grand Am',
    image: 'https://picsum.photos/500',
    content:
      'vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia',
    color: '#b7b800',
  },
  {
    id: 2,
    name: 'Chevrolet',
    subtitle: 'Venture',
    image: 'https://picsum.photos/500',
    content:
      'vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante',
    color: '#3b286c',
  },
  {
    id: 3,
    name: 'Toyota',
    subtitle: 'MR2',
    image: 'https://picsum.photos/500',
    content:
      'eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi',
    color: '#ffad19',
  },
  {
    id: 4,
    name: 'BMW',
    subtitle: '645',
    image: 'https://picsum.photos/500',
    content:
      'vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam',
    color: '#ca3dd9',
  },
  {
    id: 5,
    name: 'Dodge',
    subtitle: 'Sprinter',
    image: 'https://picsum.photos/500',
    content:
      'sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper',
    color: '#19d6aa',
  },
  {
    id: 6,
    name: 'Shelby',
    subtitle: 'GT500',
    image: 'https://picsum.photos/500',
    content:
      'cum sociis natoque penatibus et magnis dis parturient montes nascetur',
    color: '#e766a6',
  },
  {
    id: 7,
    name: 'Chrysler',
    subtitle: 'Sebring',
    image: 'https://picsum.photos/500',
    content:
      'cras pellentesque volutpat dui maecenas tristique est et tempus semper',
    color: '#187dc6',
  },
  {
    id: 8,
    name: 'Toyota',
    subtitle: 'Sequoia',
    image: 'https://picsum.photos/500',
    content:
      'nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis',
    color: '#98ba83',
  },
  {
    id: 9,
    name: 'Maserati',
    subtitle: 'GranTurismo',
    image: 'https://picsum.photos/500',
    content:
      'tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac',
    color: '#654446',
  },
  {
    id: 10,
    name: 'Ford',
    subtitle: 'F150',
    image: 'https://picsum.photos/500',
    content: 'nisi at nibh in hac habitasse platea dictumst aliquam augue quam',
    color: '#e1d516',
  },
];

const AnimatedCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const imageScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
    });

    const imageOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });

    const coloredBackgroundOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 0.7, 0],
    });

    const coloredBackgroundRotate = scrollX.interpolate({
      inputRange,
      outputRange: ['15deg', '0deg', '-15deg'],
    });

    const coloredBackgroundTranslateX = scrollX.interpolate({
      inputRange,
      outputRange: [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
    });

    return (
      <View
        style={{
          width: SCREEN_WIDTH,
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            backgroundColor: item.color,
            opacity: coloredBackgroundOpacity,
            ...StyleSheet.absoluteFill,
            transform: [
              {rotate: coloredBackgroundRotate},
              {translateX: coloredBackgroundTranslateX},
            ],
          }}
        />
        <Animated.Image
          source={{uri: item.image}}
          style={[
            styles.image,
            {
              transform: [{scale: imageScale}],
              opacity: imageOpacity,
            },
          ]}
        />
        <Animated.Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            opacity: imageOpacity,
          }}>
          {item.name} <Text style={{fontWeight: '300'}}>{item.subtitle}</Text>
        </Animated.Text>
        <Animated.Text
          style={{
            fontSize: 14,
            margin: 30,
            marginHorizontal: 55,
            textAlign: 'center',
            fontWeight: '300',
            opacity: imageOpacity,
          }}>
          {item.content}
        </Animated.Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginVertical: 46,
  },
  avatar: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: '#fff',
    position: 'absolute',
    bottom: -25,
    right: IMAGE_WIDTH * 0.1,
  },
});

export default AnimatedCarousel;
