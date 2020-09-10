import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';

let timer;

const LocationSearchAutoSuggestInput = ({placeholder, onFinishInput}) => {
  const handleInput = text => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      onFinishInput(text);
    }, 1000);
  };

  return (
    <TextInput
      style={styles.container}
      onChangeText={handleInput}
      placeholder={placeholder}
      placeholderTextColor="#c9c9c9"
    />
  );
};

export default LocationSearchAutoSuggestInput;
