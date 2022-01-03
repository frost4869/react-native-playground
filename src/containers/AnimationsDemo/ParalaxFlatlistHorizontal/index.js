/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Animated, Dimensions, Image, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const IMAGE_WIDTH = SCREEN_WIDTH * 0.7;
const IMAGE_HEIGHT = (IMAGE_WIDTH * 16) / 9;
const LIST_ITEM_HEIGHT = 600;

const data = [
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
  'https://source.unsplash.com/1080x1920/?nature,animal,women,puppy',
];

const ParalaxFlatlistHorizontalDemo = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={(item, index) => `${item}${index}`}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
          useNativeDriver: true,
        })}
        style={{
          height: LIST_ITEM_HEIGHT,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * LIST_ITEM_HEIGHT,
            index * LIST_ITEM_HEIGHT,
            (index + 1) * LIST_ITEM_HEIGHT,
          ];

          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [-LIST_ITEM_HEIGHT * 0.2, 0, LIST_ITEM_HEIGHT * 0.2],
          });

          return (
            <View
              style={{
                width: SCREEN_WIDTH,
                height: LIST_ITEM_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 20,

                  borderWidth: 10,
                  borderRadius: 18,
                  borderColor: '#fff',

                  marginVertical: 18,
                }}>
                <View
                  style={{
                    width: IMAGE_WIDTH,
                    height: IMAGE_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 18,
                    borderColor: '#fff',
                  }}>
                  <Animated.Image
                    source={{uri: item}}
                    style={[
                      styles.image,
                      {
                        transform: [{translateY}],
                      },
                    ]}
                    resizeMode="cover"
                  />
                </View>
                <FastImage
                  source={{uri: 'https://source.unsplash.com/50x50/?girl'}}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </View>
            </View>
          );
        }}
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
    width: IMAGE_WIDTH * 1.4,
    height: IMAGE_HEIGHT * 1.2,
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

export default ParalaxFlatlistHorizontalDemo;
