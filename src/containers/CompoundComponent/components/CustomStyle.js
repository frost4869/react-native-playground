import React from 'react';
import {StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import Expandable from '../../../components/Expandable/Expandable';

const CustomStyleExpandable = () => (
  <Expandable style={styles.container}>
    <Expandable.Header style={styles.header}>
      <Text>Styled Expandable Header</Text>
      <Expandable.Icon style={styles.icon} />
    </Expandable.Header>
    <Expandable.Content style={styles.content}>
      <FastImage source={{uri: 'https://picsum.photos/200'}} style={styles.image} />
    </Expandable.Content>
  </Expandable>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'pink',
    borderColor: 'blue',
  },
  icon: {
    fontWeight: 'bold',
    color: 'red',
  },
  content: {
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  image: {
    width: 300,
    aspectRatio: 1,
  },
  container: {
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
});

export default CustomStyleExpandable;
