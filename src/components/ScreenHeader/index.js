import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet, Text, View} from 'react-native';

const ScreenHeader = ({onBack, title}) => (
  <View style={styles.container}>
    <Icon name="chevron-left" style={styles.icon} onPress={onBack} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  icon: {
    color: '#000',
    fontSize: 24,
    marginRight: 20,
  },
});

export default ScreenHeader;
