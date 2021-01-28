import {inject, observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../../components/ScreenHeader';

const HomeHeader = ({authStore, onOpenSetting}) => (
  <View style={styles.container}>
    <ScreenHeader
      title={`Hey, ${authStore.email || 'stranger !'}`}
      style={styles.header}
    />
    <Icon
      onPress={onOpenSetting}
      name="ios-settings-outline"
      size={20}
      color="#fff"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 16,
  },
  header: {
    color: '#fff',
  },
});

export default inject('authStore')(observer(HomeHeader));
