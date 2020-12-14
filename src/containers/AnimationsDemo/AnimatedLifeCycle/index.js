/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Button from '../../../components/FormComponents/Button';
import ScreenHeader from '../../../components/ScreenHeader';

const screenWidth = Dimensions.get('screen').width;

const AnimatedLifeCycle = ({navigation}) => {
  const [mounted, setMounted] = useState(true);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScreenHeader
        title="ReAnimated@alpha Demo"
        onBack={() => navigation.pop()}
      />

      <View style={styles.container}>
        {/* TEST MODAL */}
        <Modal isVisible={mounted} />
      </View>

      <View>
        <ScrollView horizontal style={{padding: 4}} bounces={false}>
          <Button
            label={mounted ? 'Slide me out' : 'Spring me in'}
            style={styles.button}
            onPress={() => setMounted(!mounted)}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const Modal = ({isVisible}) => {
  const [mount, setMount] = useState(isVisible);

  const offsetX = useSharedValue(screenWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offsetX.value}],
    };
  });

  useEffect(() => {
    if (isVisible) {
      setMount(isVisible);
    }
    offsetX.value = withSpring(isVisible ? 0 : screenWidth, {}, (finished) => {
      if (finished) {
        console.log('finished :>> ', finished);
        runOnJS(setMount)(isVisible);
      }
    });
  }, [isVisible]);

  if (!mount) {
    return null;
  }

  return (
    <Animated.View style={[styles.modal, animatedStyle]}>
      <Text>some Text</Text>
      <Text>some Text</Text>
      <Text>some Text</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    backgroundColor: 'pink',
    borderRadius: 10,
  },
  modal: {
    width: '70%',
    height: 200,
    backgroundColor: 'pink',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default AnimatedLifeCycle;
