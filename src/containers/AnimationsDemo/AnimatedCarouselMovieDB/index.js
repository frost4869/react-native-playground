/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Loading from '../../../components/Loading';

const url =
  'https://api.themoviedb.org/3/movie/popular?api_key=09e4cc13c99312bf18cad8339e83bc82&language=en-US&page=1';

const imageUrl = 'http://image.tmdb.org/t/p/w342';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_SIZE = SCREEN_WIDTH * 0.72;
const SPACER_SIZE = (SCREEN_WIDTH - ITEM_SIZE) / 2;

const AnimatedCarouselMovieDB = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(url).then((response) => {
      if (response && response.data) {
        setData([
          {id: 'left-space'},
          ...response.data.results,
          {id: 'right-space'},
        ]);
        setLoading(false);
      }
    });
  }, []);

  const renderItem = ({item, index}) => {
    if (item.id === 'left-space' || item.id === 'right-space') {
      return <View style={{width: SPACER_SIZE}} />;
    }

    const {poster_path, title, overview} = item;
    const imagePath = `${imageUrl}${poster_path}`;

    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [50, 0, 50],
    });

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            transform: [{translateY}],
          },
        ]}>
        <Image source={{uri: imagePath}} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.overview} numberOfLines={3}>
          {overview}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading visible={isLoading} />
      ) : (
        <Animated.FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          snapToInterval={ITEM_SIZE}
          decelerationRate={0}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
        />
      )}
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
    width: '100%',
    height: 350,
    borderRadius: 20,
  },
  itemContainer: {
    width: ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    width: SCREEN_WIDTH * 0.6,
    textAlign: 'center',
  },
  overview: {
    fontSize: 12,
    marginTop: 16,
  },
});

export default AnimatedCarouselMovieDB;
