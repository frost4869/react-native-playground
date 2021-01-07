import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DemoItem from '../Home/components/DemoItem';

const menus = [
  {route: 'ParalaxFlatlist', title: 'Paralax Flatlist'},
  {route: 'ParalaxFlatlistHorizontal', title: 'Paralax Flatlist Horizontal'},
  {route: 'AnimatedCarousel', title: 'Animated Carousel'},
  {route: 'FlatlistAnimation1', title: 'Animated Flatlist 1'},
  {route: 'AnimatedCarouselMovieDB', title: 'Animated Carousel MovieDB'},
  {route: 'LifeCycleAnimation', title: 'ReAnimated@alpha tryout'},
  {route: '3DFlipAnimation', title: '3D Flip Animation'},
];

export default class AnimationsDemoScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <ScrollView style={styles.container}>
        {menus.map((item, index) => (
          <DemoItem
            key={index}
            onPress={() => {
              navigation.navigate(item.route);
            }}
            title={item.title}
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
