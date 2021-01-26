/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import faker from 'faker';
import ScreenHeader from '../../../components/ScreenHeader';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.7;
const IMAGE_HEIGHT = (IMAGE_WIDTH * 16) / 9;

const data = Array.from(Array(10), () => faker.image.abstract());

const ParalaxFlatlistDemo = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Paralax Flatlist" onBack={() => navigation.pop()} />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Animated.FlatList
          data={data}
          keyExtractor={(item, index) => `${item}${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ];

            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-SCREEN_WIDTH * 0.7, 0, SCREEN_WIDTH * 0.7],
            });

            return (
              <View
                style={{
                  width: SCREEN_WIDTH,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.imageBorderWrapper}>
                  <View
                    style={{
                      width: IMAGE_WIDTH,
                      height: IMAGE_HEIGHT,
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                      borderRadius: 10,
                      borderColor: '#fff',
                    }}>
                    <Animated.Image
                      source={{uri: item}}
                      style={[
                        styles.image,
                        {
                          transform: [{translateX}],
                        },
                      ]}
                      resizeMode="cover"
                    />
                  </View>
                  <Image
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: IMAGE_WIDTH * 1.4,
    height: IMAGE_HEIGHT,
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
  imageBorderWrapper: {
    elevation: 18,
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
  },
});

export default ParalaxFlatlistDemo;
