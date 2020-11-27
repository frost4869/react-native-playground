import React, {useContext} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DemoItem from './DemoItem';
import {NavigationProvider} from '..';

const DemoList = () => {
  const navigation = useContext(NavigationProvider);
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <DemoItem
        onPress={() => {
          navigation.navigate('Biometric');
        }}
        title="Faceid / Fingerprint"
      />
      <DemoItem
        onPress={() => {
          navigation.navigate('AnimationsDemo');
        }}
        title="Animations"
      />
      <DemoItem
        onPress={() => {
          navigation.navigate('CompoundComponent');
        }}
        title="Compound Component"
      />
      <DemoItem
        onPress={() => {
          navigation.navigate('AppleSignin');
        }}
        title="Apple Signin"
      />
      <DemoItem
        onPress={() => {
          navigation.navigate('GoogleMap');
        }}
        title="Google Map"
      />
      <DemoItem
        onPress={() => {
          navigation.navigate('SensorsDemo');
        }}
        title="Sensors"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
});

export default DemoList;
