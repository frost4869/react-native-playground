import faker from 'faker';
import React, {useRef} from 'react';
import {Animated, Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Txt from '../../../components/Txt';
import styles from './styles';

export const ITEM_HEIGHT = 80 + 16;

const data = Array.from(Array(30), (e, i) => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  avatar: faker.image.animals(),
}));

const AnimatedFlatlist = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleRenderItem = ({item, index}) => {
    const inputRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 2)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Animated.View style={{...styles.itemContainer, transform: [{scale}]}}>
        <FastImage source={{uri: item.avatar}} style={styles.avatar} />
        <Txt style={styles.name}>{item.name}</Txt>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={handleRenderItem}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
          useNativeDriver: true,
        })}
      />
    </View>
  );
};

export default AnimatedFlatlist;
