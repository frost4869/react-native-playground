import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CurrentLocationButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
    <Icon name="my-location" style={styles.symbal} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  symbal: {
    fontSize: 20,
  },
});

export default CurrentLocationButton;
