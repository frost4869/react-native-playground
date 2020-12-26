/* eslint-disable react-native/no-inline-styles */
import {inject, observer} from 'mobx-react';
import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import OnBoardLogo from '../../assets/onboard_logo.svg';
import styles from './styles';
const {width, height} = Dimensions.get('screen');

const OnboardScreen = ({authStore, navigation}) => (
  <View style={styles.container}>
    <OnBoardLogo
      width={width * 0.8}
      height={height * 0.45}
      style={styles.logo}
    />
    <View style={styles.contentContainer}>
      <Text style={styles.h1}>Hi there !</Text>
      <Text style={styles.h3}>
        I use this project to demonstrate how much I can achieve with React
        Native...
      </Text>
      <Text style={styles.h3}>as well as trying out new approches</Text>
    </View>
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.goBtn}
        activeOpacity={0.8}
        onPress={() => authStore.overrideLogin()}>
        <Text style={{...styles.h3, color: 'black', marginBottom: 0}}>
          Let's Go
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signinBtn}
        onPress={() => navigation.navigate('Login')}>
        <Text style={{...styles.h3, marginBottom: 0}}>Sign in</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default inject('authStore')(observer(OnboardScreen));
