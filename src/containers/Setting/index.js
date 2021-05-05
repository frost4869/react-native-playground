/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView} from 'react-native';
import styles from './styles';

const SettingScreen = ({navigation}) => {
  return <SafeAreaView style={{...styles.container, alignItems: 'center'}}></SafeAreaView>;
};

export default SettingScreen;
