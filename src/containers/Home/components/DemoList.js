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
          navigation.navigate('ControlProps');
        }}
        title="Control Props"
      />
      <DemoItem
        onPress={() => {
          navigation.navigate('CustomHook');
        }}
        title="Custom Hook"
      />
      <DemoItem
        onPress={() => {
          navigation.navigate('AppleSignin');
        }}
        title="Apple Signin"
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
