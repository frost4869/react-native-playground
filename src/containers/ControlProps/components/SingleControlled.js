import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import Expandable from '../../../components/Expandable/Expandable';

const SingleControlledExpandable = () => {
  const [isExpanded, setExpand] = useState(false);
  const onToggleExpand = () => {
    setExpand(!isExpanded);
  };
  return (
    <>
      <Text style={styles.state}>
        Expand state: {isExpanded ? 'opened' : 'closed'}
      </Text>
      <Expandable onExpand={onToggleExpand} shouldExpand={isExpanded}>
        <Expandable.Header>
          <Text>Controlled Expandable</Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  state: {
    marginBottom: 8,
  },
});

export default SingleControlledExpandable;
