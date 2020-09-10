import React, {Component, createContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class AnimationsDemoScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>animation demo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
