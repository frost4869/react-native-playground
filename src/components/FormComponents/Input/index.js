import React from 'react';
import {TextInput, Text, View} from 'react-native';
import styles from './styles';

const Input = ({onChange, onBlur, value, error, ...props}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        placeholderTextColor="gray"
        {...props}
      />
      {error && <Text style={styles.validationMessage}>{error?.message}</Text>}
    </View>
  );
};

export default Input;
