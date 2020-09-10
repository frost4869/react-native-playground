import React from 'react';
import {Text} from 'react-native';
import Expandable from '../../../components/Expandable/Expandable';

const DefaultExpandable = () => (
  <Expandable>
    <Expandable.Header>
      <Text>Default Expandable Header</Text>
      <Expandable.Icon />
    </Expandable.Header>
    <Expandable.Content>
      <Text>Expandable Content</Text>
      <Text>Expandable Content</Text>
      <Text>Expandable Content</Text>
      <Text>Expandable Content</Text>
      <Text>Expandable Content</Text>
      <Text>Expandable Content</Text>
    </Expandable.Content>
  </Expandable>
);

export default DefaultExpandable;
