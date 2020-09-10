import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ExpandableContext} from './Expandable';

const Header = ({children, style = {}}) => {
  const {toggle} = useContext(ExpandableContext);
  const combinedStyles = [styles.container, style];
  return (
    <TouchableOpacity style={combinedStyles} onPress={toggle}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderColor: 'gray',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Header;
