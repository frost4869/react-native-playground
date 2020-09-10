import React, {useContext} from 'react';
import {ExpandableContext} from './Expandable';
import {Text} from 'react-native';

const Icon = ({style = {}}) => {
  const {isExpanded} = useContext(ExpandableContext);
  const combinedStyle = [style];
  return <Text style={combinedStyle}>{isExpanded ? '-' : '+'}</Text>;
};

export default Icon;
