/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Button from '../../../components/FormComponents/Button';
import ScreenHeader from '../../../components/ScreenHeader';

const screenWidth = Dimensions.get('screen').width;

const AnimatedLifeCycle = ({navigation}) => {
  const [mounted, setMounted] = useState(true);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScreenHeader
        title="ReAnimated@alpha Demo"
        onBack={() => navigation.pop()}
      />

      <View style={styles.container}>
        <Modal isVisible={mounted} />

        <Button
          label={mounted ? 'Slide me out' : 'Spring me in'}
          style={styles.button}
          onPress={() => setMounted(!mounted)}
        />
      </View>
    </SafeAreaView>
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
    flex: 0.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    backgroundColor: 'pink',
    borderRadius: 10,
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
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
