import React, {Component, createContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../components/FormComponents/Button';
import DemoList from './components/DemoList';
import {inject, observer} from 'mobx-react';

export const NavigationProvider = createContext();
const {Provider} = NavigationProvider;

@inject('authStore')
@observer
class HomeScreen extends Component {
  hadnleLogout = () => {
    this.props.authStore.logout();
  };
  render() {
    return (
      <Provider value={this.props.navigation}>
        <View style={styles.container}>
          <DemoList />
        </View>
        <Button
          label="Logout"
          style={styles.logoutBtn}
          onPress={this.hadnleLogout}
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
});

export default HomeScreen;
