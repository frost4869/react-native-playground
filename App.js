/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Provider} from 'mobx-react';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import RootStore from './src/mobx/rootStore';
import Root from './src/navigations';

GoogleSignin.configure({
  webClientId:
    '889491103641-d09pv3bmufrmonksh6jg3g4genbij096.apps.googleusercontent.com',
});
const rootStore = new RootStore();

const App: () => React$Node = () => {
  return (
    <Provider {...rootStore}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* <SafeAreaView style={styles.container}> */}
      <Root />
      {/* </SafeAreaView> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
