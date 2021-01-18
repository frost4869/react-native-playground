/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Image, StyleSheet, View} from 'react-native';
import Loading from '../../../components/Loading';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const ITEM_SIZE = parseInt(SCREEN_WIDTH * 0.7);
const SPACER_SIZE = (SCREEN_WIDTH - ITEM_SIZE) / 2;

const url =
  'https://api.themoviedb.org/3/movie/popular?api_key=09e4cc13c99312bf18cad8339e83bc82&language=en-US&page=1';
const imageUrl = 'http://image.tmdb.org/t/p/w342';

const FlipAnimationScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  const fetchData = () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item, index}) => {
    if (item.id === 'left-space' || item.id === 'right-space') {
      return <View style={{width: SPACER_SIZE}} />;
    }

    const {poster_path} = item;
    const imagePath = `${imageUrl}${poster_path}`;

    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];

    const rotateY = scrollX.interpolate({
      inputRange,
      outputRange: ['-45deg', '0deg', '45deg'],
    });

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-30, 0, 30],
    });

    return (
      <Animated.View
        style={{
          ...styles.itemContainer,
          transform: [{translateX}, {perspective: ITEM_SIZE * 1.5}, {rotateY}],
        }}>
        <View style={{borderWidth: 10, borderColor: '#000', borderRadius: 10}}>
          <View style={{backgroundColor: '#000'}}>
            <Image style={styles.image} source={{uri: imagePath}} />
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Loading visible={isLoading} />
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        decelerationRate="fast"
        pagingEnabled
        bounces={false}
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
  itemContainer: {
    width: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.8,
    borderRadius: 10,
  },
});

export default FlipAnimationScreen;
