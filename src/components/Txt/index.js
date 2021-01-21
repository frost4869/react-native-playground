import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Txt = ({children, style}) => (
  <Text style={[styles.customFont, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'Poppins',
  },
});

export default Txt;
