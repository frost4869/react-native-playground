import React from 'react';
import {Text, View} from 'react-native';
import DemoItem from '../Home/components/DemoItem';

const SensorDemoScreen = ({navigation}) => (
  <View>
    <DemoItem
      onPress={() => {
        navigation.navigate('GyroscopeDemo');
      }}
      title="Gyroscope"
    />
  </View>
);

export default SensorDemoScreen;
