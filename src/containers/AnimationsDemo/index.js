import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AnimatedList from '../../components/AnimatedListWrapper';
import ScreenHeader from '../../components/ScreenHeader';
import DemoItem from '../Home/components/DemoItem';

const menus = [
  {route: 'ParalaxFlatlist', title: 'Paralax Flatlist'},
  {route: 'ParalaxFlatlistHorizontal', title: 'Paralax Flatlist Horizontal'},
  {route: 'AnimatedCarousel', title: 'Animated Carousel'},
  {route: 'FlatlistAnimation1', title: 'Product Showcase'},
  {route: 'AnimatedCarouselMovieDB', title: 'Animated Carousel MovieDB'},
  {route: '3DFlipAnimation', title: '3D Flip Animation'},
  {route: 'AnimatedFlatlist', title: 'Animated Flatlist'},
];

export default class AnimationsDemoScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Animations"
          onBack={() => {
            navigation.pop();
          }}
          style={styles.header}
        />
        <AnimatedList>
          {menus.map((item, index) => (
            <DemoItem
              key={index}
              onPress={() => {
                navigation.navigate(item.route);
              }}
              title={item.title}
            />
          ))}
        </AnimatedList>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    marginHorizontal: 16,
    marginTop: 20,
  },
});
