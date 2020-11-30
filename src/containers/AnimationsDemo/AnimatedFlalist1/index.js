/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Animated, Dimensions, Text, View} from 'react-native';
import styles, {PAGING_DOT_CONTAINER_WIDTH, TICKER_HEIGHT} from './styles';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const data = [
  {
    id: 1,
    name: 'Charcoal Black',
    subtitle: 'Grand Am',
    image:
      'https://www.urbanears.com/dw/image/v2/BCQL_PRD/on/demandware.static/-/Sites-zs-master-catalog/default/dwe38eaf41/images/urbanears/speakers/ralis/large/UE_ralis_product-large_black-1_3x.png?sw=1720&sh=1720&sm=fit',
    content:
      'vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia',
    color: '#4B4B4B',
  },
  {
    id: 2,
    name: 'Haute Red',
    subtitle: 'Venture',
    image:
      'https://www.urbanears.com/dw/image/v2/BCQL_PRD/on/demandware.static/-/Sites-zs-master-catalog/default/dw8efcdc20/images/urbanears/speakers/ralis/large/UE_ralis_product-large_red-1_3x.png?sw=1720&sh=1720&sm=fit',
    content:
      'vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante',
    color: '#A9484A',
  },
  {
    id: 3,
    name: 'Mist Grey',
    subtitle: 'MR2',
    image:
      'https://www.urbanears.com/dw/image/v2/BCQL_PRD/on/demandware.static/-/Sites-zs-master-catalog/default/dwb64b7a0e/images/urbanears/speakers/ralis/large/UE_ralis_product-large_grey-1_3x.png?sw=1720&sh=1720&sm=fit',
    content:
      'eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi',
    color: '#949392',
  },
  {
    id: 4,
    name: 'Slate Blue',
    subtitle: '645',
    image:
      'https://www.urbanears.com/dw/image/v2/BCQL_PRD/on/demandware.static/-/Sites-zs-master-catalog/default/dw4a0a4595/images/urbanears/speakers/ralis/large/UE_ralis_product-large_blue-1_3x.png?sw=1720&sh=1720&sm=fit',
    content:
      'vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam',
    color: '#455976',
  },
];

const AnimatedFlalist1 = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const opacityInputRange = [
      (index - 0.5) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 0.5) * SCREEN_WIDTH,
    ];

    const circleInputRange = [
      (index - 0.5) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 0.5) * SCREEN_WIDTH,
    ];

    const headerTranslateX = scrollX.interpolate({
      inputRange,
      outputRange: [SCREEN_WIDTH * 0.3, 0, -SCREEN_WIDTH * 0.3],
    });

    const contentTranslateX = scrollX.interpolate({
      inputRange,
      outputRange: [SCREEN_WIDTH * 0.6, 0, -SCREEN_WIDTH * 0.6],
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });

    const textOpacity = scrollX.interpolate({
      inputRange: opacityInputRange,
      outputRange: [0, 1, 0],
    });

    const circleScale = scrollX.interpolate({
      inputRange: circleInputRange,
      outputRange: [0, 1, 0],
    });
    const circleOpacity = scrollX.interpolate({
      inputRange: circleInputRange,
      outputRange: [0, 0.4, 0],
    });

    return (
      <View style={styles.imageCarouselContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Animated.View
            style={[
              styles.backgroundCircle,
              {
                backgroundColor: item.color,
                opacity: circleOpacity,
                transform: [{scale: circleScale}],
              },
            ]}
          />

          <Animated.Image
            source={{uri: item.image}}
            style={[styles.image, {transform: [{scale}]}]}
          />
        </View>

        <View style={{height: 60}} />

        <View style={styles.bottomContent}>
          <Animated.Text
            style={[
              styles.header,
              {
                opacity: textOpacity,
                transform: [{translateX: headerTranslateX}],
              },
            ]}>
            {item.name} {item.subtitle}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.content,
              {
                opacity: textOpacity,
                transform: [{translateX: contentTranslateX}],
              },
            ]}>
            {item.content}
          </Animated.Text>
        </View>
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
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
      />
      <Paging scrollX={scrollX} />
      <Ticker scrollX={scrollX} />

      <View style={styles.leftContent}>
        <Text style={styles.leftText}>Urbanears Rålis</Text>
      </View>
    </View>
  );
};

const Paging = ({scrollX}) => {
  const inputRange = [-SCREEN_WIDTH, 0, SCREEN_WIDTH];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-PAGING_DOT_CONTAINER_WIDTH, 0, PAGING_DOT_CONTAINER_WIDTH],
  });

  return (
    <View style={styles.pagingContainer}>
      <Animated.View
        style={{
          width: PAGING_DOT_CONTAINER_WIDTH,
          height: PAGING_DOT_CONTAINER_WIDTH,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: PAGING_DOT_CONTAINER_WIDTH / 2,
          position: 'absolute',
          transform: [{translateX}],
        }}
      />
      {data.map((item, index) => {
        const dotScale = scrollX.interpolate({
          inputRange: [
            (index - 2) * SCREEN_WIDTH,
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
            (index + 2) * SCREEN_WIDTH,
          ],
          outputRange: [1, 1, 1.8, 1, 1],
        });
        return (
          <View key={item.id} style={styles.pageDotContainer}>
            <Animated.View
              style={[
                styles.page,
                {backgroundColor: item.color, transform: [{scale: dotScale}]},
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

const Ticker = ({scrollX}) => {
  const inputRange = [-SCREEN_WIDTH, 0, SCREEN_WIDTH];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={[styles.tickerContainer]}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map((item) => (
          <Text key={item.id} style={styles.ticker}>
            {item.name}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
};

export default AnimatedFlalist1;
