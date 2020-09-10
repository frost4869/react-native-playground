import React, {Component, createContext} from 'react';
import {StyleSheet, View} from 'react-native';
import DemoList from './components/DemoList';


export const NavigationProvider = createContext();
const {Provider} = NavigationProvider;

export default class HomeScreen extends Component {
  render() {
    return (
      <Provider value={this.props.navigation}>
        <View style={styles.container}>
          <DemoList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
