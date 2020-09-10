import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';

const Input = ({onChange, onBlur, value, ...props}) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      onBlur={onBlur}
      value={value}
      placeholderTextColor="gray"
      {...props}
    />
  );
};

export default Input;
