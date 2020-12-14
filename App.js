/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import Root from './src/navigations';
import {Provider} from 'mobx-react';
import RootStore from './src/mobx/rootStore';

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
