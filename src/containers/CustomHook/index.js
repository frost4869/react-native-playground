import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Expandable from '../../components/Expandable/Expandable';
import useExpanded from '../../hooks/useExpanded';

const CustomHookScreen = () => {
  const {isExpanded, toggle} = useExpanded();

  return (
    <View style={styles.container}>
      <Expandable shouldExpand={isExpanded} onExpand={toggle}>
        <Expandable.Header>
          <Text>Expandable using Hooks !</Text>
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
    </View>
  );
};

export default CustomHookScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
