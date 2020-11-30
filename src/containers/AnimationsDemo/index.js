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
        <DemoItem
          onPress={() => {
            navigation.navigate('ParalaxFlatlistHorizontal');
          }}
          title="Paralax Flatlist Horizontal"
        />
        <DemoItem
          onPress={() => {
            navigation.navigate('AnimatedCarousel');
          }}
          title="Animated Carousel"
        />
        <DemoItem
          onPress={() => {
            navigation.navigate('FlatlistAnimation1');
          }}
          title="Animated Flatlist 1"
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
