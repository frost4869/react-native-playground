import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Input = ({onChange, onBlur, value, error, style, password, ...props}) => {
  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{...styles.input, ...style}}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        placeholderTextColor="gray"
        secureTextEntry={password && !isVisible}
        {...props}
      />
      {password ? (
        isVisible ? (
          <Icon
            name="eye"
            color="white"
            onPress={toggleVisibility}
            style={styles.icon}
          />
        ) : (
          <Icon
            name="eye-slash"
            color="white"
            onPress={toggleVisibility}
            style={styles.icon}
          />
        )
      ) : null}
      {error && <Text style={styles.validationMessage}>{error?.message}</Text>}
    </View>
  );
};

export default Input;
