import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const DemoItem = ({onPress, title}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.container}
    activeOpacity={0.8}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    fontWeight: '600',
  },
});

export default DemoItem;
