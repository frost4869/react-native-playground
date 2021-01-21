import React from 'react';
import {Pressable} from 'react-native';
import Txt from '../../Txt';
import styles from './styles';

const Button = ({onPress, label, labelStyle, icon, ...props}) => {
  return (
    <Pressable onPress={onPress} {...props}>
      <Txt style={[styles.label, labelStyle]}>{label}</Txt>
      {icon}
    </Pressable>
  );
};

export default Button;
