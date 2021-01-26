import {inject, observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../../components/ScreenHeader';

const HomeHeader = ({authStore}) => (
  <View style={styles.container}>
    <ScreenHeader title={`Hey, ${authStore.email || 'stranger !'}`} />
    <Icon onPress={() => {}} name="ios-settings-outline" size={20} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
  },
});

export default inject('authStore')(observer(HomeHeader));