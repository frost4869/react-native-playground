import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DefaultExpandable from './components/Default';
import CustomStyleExpandable from './components/CustomStyle';
import WithCallbackExpandable from './components/ExpandCallBack';

export default class CompoundComponentScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <DefaultExpandable />
        <WithCallbackExpandable />
        <CustomStyleExpandable />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
