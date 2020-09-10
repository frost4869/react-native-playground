import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import SingleControlledExpandable from './components/SingleControlled';
import ListControlledExpandable from './components/ListControlled';

export default class ControlPropsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SingleControlledExpandable />
        <ListControlledExpandable />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
