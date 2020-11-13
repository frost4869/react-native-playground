import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {
  gyroscope,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {useState} from 'react';
import {map, filter, scan} from 'rxjs/operators';

setUpdateIntervalForType(SensorTypes.gyroscope, 1000); // defaults to 100ms

const GyroscopeDemo = () => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
    timestamp: null,
  });

  const subscription = gyroscope
    .pipe(
      scan((acc, value) => {
        console.log('acc :>> ', acc);
        console.log('value :>> ', value);
        return {
          x: acc.x - value.x,
          y: acc.y + value.y,
        };
        // console.log(`x: ${acc.x}, y: ${acc.y}, z: ${acc.z}`);
        // console.log(`x: ${value.x}, y: ${value.y}, z: ${value.z}`);
      }, data),
      map(({x, y}) => ({x, y})),
    )
    .subscribe((value) => console.log('data :>> ', value));

  useEffect(() => {
    return subscription.unsubscribe();
  });

  // setTimeout(() => {
  //   // If it's the last subscription to accelerometer it will stop polling in the native API
  //   subscription.unsubscribe();
  // }, 1000);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gyroscope Demo</Text>
      <Text>{`x: ${data.x}`}</Text>
      <Text>{`y: ${data.y}`}</Text>
    </View>
  );
};

export default GyroscopeDemo;
