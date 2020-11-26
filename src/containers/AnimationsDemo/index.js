import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DemoItem from '../Home/components/DemoItem';

export default class AnimationsDemoScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <ScrollView style={styles.container}>
        <DemoItem
          onPress={() => {
            navigation.navigate('ParalaxFlatlist');
          }}
          title="Paralax Flatlist"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
