/* eslint-disable react-native/no-inline-styles */
import MaskedView from '@react-native-community/masked-view';
import Axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import Loading from '../../../components/Loading';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const url =
  'https://api.themoviedb.org/3/movie/popular?api_key=09e4cc13c99312bf18cad8339e83bc82&language=en-US&page=1';

const imageUrl = 'http://image.tmdb.org/t/p/w342';
const posterUrl = 'http://image.tmdb.org/t/p/original';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const ITEM_SIZE = parseInt(SCREEN_WIDTH * 0.72);
const SPACER_SIZE = (SCREEN_WIDTH - ITEM_SIZE) / 2;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function Backdrop({movies, scrollX}) {
  const renderBackdropItem = ({item, index}) => {
    if (!item.backdrop_path) {
      return null;
    }
    const imagePath = `${posterUrl}${item.backdrop_path}`;

    const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-SCREEN_WIDTH, 0],
    });
    return (
      <MaskedView
        key={item.id}
        style={{
          position: 'absolute',
        }}
        maskElement={
          <AnimatedSvg
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
            viewBox={`0 0 ${SCREEN_WIDTH} ${SCREEN_HEIGHT}`}
            style={{
              transform: [{translateX}],
            }}>
            <Rect
              x="0"
              y="0"
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              fill="red"
            />
          </AnimatedSvg>
        }>
        <Image
          source={{uri: imagePath}}
          resizeMode="cover"
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.6}}
        />
      </MaskedView>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.6,
      }}>
      {movies.map((item, index) => renderBackdropItem({item, index}))}

      <LinearGradient
        colors={['transparent', '#fff']}
        style={{
          ...StyleSheet.absoluteFill,
        }}
      />
    </View>
  );
}

const AnimatedCarouselMovieDB = ({navigation}) => {
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
      outputRange: [120, 60, 120],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            transform: [{translateY}],
            opacity,
          },
        ]}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 18,
            width: ITEM_SIZE - 20,
            marginHorizontal: 10,
            borderRadius: 20,
            alignItems: 'center',
          }}>
          <Image source={{uri: imagePath}} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.overview} numberOfLines={3}>
            {overview}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Pressable style={styles.backBtn} onPress={() => navigation.pop()}>
        <Icon name="chevron-left" color="#fff" size={28} />
      </Pressable>
      <Loading visible={isLoading} />
      <Backdrop movies={data} scrollX={scrollX} />
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
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
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    width: ITEM_SIZE,
    textAlign: 'center',
  },
  overview: {
    fontSize: 12,
    marginTop: 16,
  },
  backBtn: {
    position: 'absolute',
    top: 54,
    left: 18,
    zIndex: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
});

export default AnimatedCarouselMovieDB;
