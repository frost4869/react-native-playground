import React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import Expandable from '../../../components/Expandable/Expandable';

const CustomStyleExpandable = () => (
  <Expandable style={styles.container}>
    <Expandable.Header style={styles.header}>
      <Text>Styled Expandable Header</Text>
      <Expandable.Icon style={styles.icon} />
    </Expandable.Header>
    <Expandable.Content style={styles.content}>
      <Image source={{uri: 'https://picsum.photos/200'}} style={styles.image} />
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
