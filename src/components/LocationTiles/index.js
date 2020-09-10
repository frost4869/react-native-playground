import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

const LocationTile = ({onPress, content}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.content}>{content}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'black',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  content: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LocationTile;
