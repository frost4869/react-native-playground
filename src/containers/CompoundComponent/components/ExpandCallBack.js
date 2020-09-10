import React from 'react';
import {Text} from 'react-native';
import Expandable from '../../../components/Expandable/Expandable';

const WithCallbackExpandable = () => {
  const _onExpand = isExpanded => {
    alert(isExpanded ? 'Opened' : 'Closed');
  };

  return (
    <Expandable onExpand={_onExpand}>
      <Expandable.Header>
        <Text>With Callback Expandable</Text>
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
};

export default WithCallbackExpandable;
