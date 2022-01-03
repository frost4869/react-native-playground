import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Txt from '../../../components/Txt';
import { border_radius } from '../../../themes/constants';

const DemoItem = ({onPress, title, style}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, style]}
    activeOpacity={0.8}>
    <Txt style={styles.title}>{title}</Txt>
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
    borderRadius: border_radius,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  title: {
    fontWeight: '600',
  },
});

export default DemoItem;
