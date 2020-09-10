import React, {useContext} from 'react';
import {ExpandableContext} from './Expandable';
import {View, StyleSheet} from 'react-native';

const Content = ({children, style = {}}) => {
  const {isExpanded} = useContext(ExpandableContext);
  const combinedStyles = [styles.contentContainer, style];
  return isExpanded ? <View style={combinedStyles}>{children}</View> : null;
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 8,
    borderColor: 'green',
    borderWidth: 0.5,
  },
});

export default Content;
