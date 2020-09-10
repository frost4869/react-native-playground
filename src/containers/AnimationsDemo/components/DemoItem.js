import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const DemoItem = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text>{title}</Text>
    <Text>{'>'}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    margin: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DemoItem;
