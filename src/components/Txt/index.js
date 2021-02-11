import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Txt = ({children, style, ...props}) => (
  <Text style={[styles.customFont, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'Poppins',
  },
});

export default Txt;
