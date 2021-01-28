import React from 'react';
import {ScrollView, Switch, View} from 'react-native';
import Txt from '../../components/Txt';
import WithHeaderHOC from '../../components/WithHeaderHOC';
import styles from './styles';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.settingItem}>
          <Txt style={{color: '#fff'}}>Dark mode</Txt>
          <Switch
            onValueChange={() => {}}
            trackColor={{false: '#767577', true: '#81b0ff'}}
          />
        </View>
        <View style={styles.settingItem}>
          <Txt style={{color: '#fff'}}>Dark mode</Txt>
          <Switch
            onValueChange={() => {}}
            trackColor={{false: '#767577', true: '#81b0ff'}}
          />
        </View>
        <View style={styles.settingItem}>
          <Txt style={{color: '#fff'}}>Dark mode</Txt>
          <Switch
            onValueChange={() => {}}
            trackColor={{false: '#767577', true: '#81b0ff'}}
          />
        </View>
        <View style={styles.settingItem}>
          <Txt style={{color: '#fff'}}>Dark mode</Txt>
          <Switch
            onValueChange={() => {}}
            trackColor={{false: '#767577', true: '#81b0ff'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default WithHeaderHOC({
  title: 'Settings',
  hasBack: true,
})(SettingScreen);
