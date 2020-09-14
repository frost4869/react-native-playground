import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

const Loading = ({
  visible,
  onTop = true,
  containerStyle,
  spinnerStyle,
  spinnerContainerStyle,
}) => {
  if (!visible) return null;

  const container = onTop ? styles.onTopContainer : styles.container;
  return (
    <View style={[container, containerStyle]}>
      <View style={[styles.spinnerContainer, spinnerContainerStyle]}>
        <ActivityIndicator
          size="large"
          style={[styles.spinner, spinnerStyle]}
          color="#fff"
        />
      </View>
    </View>
  );
};

export default Loading;
