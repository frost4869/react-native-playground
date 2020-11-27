/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DefaultExpandable from './components/Default';
import CustomStyleExpandable from './components/CustomStyle';
import WithCallbackExpandable from './components/ExpandCallBack';
import DemoItem from '../Home/components/DemoItem';

export default class CompoundComponentScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <DefaultExpandable />
        <WithCallbackExpandable />
        <CustomStyleExpandable />

        <View style={{height: 40}} />

        <DemoItem
          onPress={() => {
            this.props.navigation.navigate('ControlProps');
          }}
          title="Control Props"
        />
        <DemoItem
          onPress={() => {
            this.props.navigation.navigate('CustomHook');
          }}
          title="Custom Hook"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
