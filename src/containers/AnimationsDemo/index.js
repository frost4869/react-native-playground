import React, {Component} from 'react';
import AnimatedList from '../../components/AnimatedListWrapper';
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
    );
  }
}
