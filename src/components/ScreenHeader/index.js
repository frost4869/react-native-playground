import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Txt from '../Txt';

const ScreenHeader = ({onBack, title, style}) => (
  <View style={{...styles.container, style}}>
    {onBack && (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onBack}
        style={styles.backBtn}>
        <Icon name="back" color="white" size={28} />
      </TouchableOpacity>
    )}

    <View style={styles.Txt}>
      <Txt style={styles.h1}>{title}</Txt>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {},
  h1: {
    marginBottom: 16,
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 1,
  },
  backBtn: {
    marginBottom: 25,
  },
});

export default ScreenHeader;
