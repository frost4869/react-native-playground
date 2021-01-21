import {inject, observer} from 'mobx-react';
import React, {Component, createContext} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Button from '../../components/FormComponents/Button';
import Txt from '../../components/Txt';
import DemoList from './components/DemoList';

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
          <Txt style={styles.user}>
            Logged in as: {this.props.authStore.email || 'Annoymous'}
          </Txt>
          <DemoList />
        </View>
        <Button
          label="Logout"
          style={styles.logoutBtn}
          labelStyle={styles.btnLabel}
          onPress={this.handleLogout}
        />
        <SafeAreaView />
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
    margin: 16,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  user: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  btnLabel: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;
