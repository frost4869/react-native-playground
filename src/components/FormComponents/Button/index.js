import React from 'react';
import {Pressable, Text} from 'react-native';
import styles from './styles';

const Button = ({onPress, label, labelStyle, icon, ...props}) => {
  return (
    <Pressable onPress={onPress} {...props}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {icon}
    </Pressable>
  );
};

export default Button;
