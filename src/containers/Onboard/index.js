/* eslint-disable react-native/no-inline-styles */
import {inject, observer} from 'mobx-react';
import React from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import OnBoardLogo from '../../assets/onboard_logo.svg';
import Txt from '../../components/Txt';
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
      <Txt style={styles.h1}>Hi there !</Txt>
      <Txt style={styles.h3}>
        I use this project to demonstrate how much I can achieve with React
        Native
      </Txt>
      <Txt style={styles.h3}>Also a good place to tryout new approches</Txt>
    </View>
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.goBtn}
        activeOpacity={0.8}
        onPress={() => authStore.overrideLogin()}>
        <Txt style={{...styles.h3, color: 'black', marginBottom: 0}}>
          Let's Go
        </Txt>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signinBtn}
        onPress={() => navigation.navigate('Login')}>
        <Txt style={{...styles.h3, marginBottom: 0}}>Sign in</Txt>
      </TouchableOpacity>
    </View>
  </View>
);

export default inject('authStore')(observer(OnboardScreen));
