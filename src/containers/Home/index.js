import {inject, observer} from 'mobx-react';
import React, {Component, createContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../components/FormComponents/Button';
import DemoList from './components/DemoList';
import * as LocalAuth from 'expo-local-authentication';

export const NavigationProvider = createContext();
const {Provider} = NavigationProvider;

@inject('authStore')
@observer
class HomeScreen extends Component {
  handleLogout = () => {
    this.props.authStore.logout();
  };
  render() {
    return (
      <Provider value={this.props.navigation}>
        <View style={styles.container}>
          <Text style={styles.user}>
            Logged in as: {this.props.authStore.email || 'Annoymous'}
          </Text>
          <DemoList />
        </View>
        <Button
          label="Logout"
          style={styles.logoutBtn}
          onPress={this.handleLogout}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutBtn: {
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    padding: 8,
  },
});

export default HomeScreen;
