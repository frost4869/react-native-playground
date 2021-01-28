import {inject, observer} from 'mobx-react';
import React, {createContext, PureComponent} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Button from '../../components/FormComponents/Button';
import DemoList from './components/DemoList';
import Header from './components/Header';

export const NavigationProvider = createContext();
const {Provider} = NavigationProvider;

@inject('authStore')
@observer
class HomeScreen extends PureComponent {
  handleLogout = () => {
    this.props.authStore.logout();
  };

  handleOpenSetting = () => {
    this.props.navigation.navigate('SettingScreen');
  };
  render() {
    return (
      <Provider value={this.props.navigation}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.container}>
            <Header onOpenSetting={this.handleOpenSetting} />
            <DemoList />
          </View>
          <Button
            label="Logout"
            style={styles.logoutBtn}
            labelStyle={styles.btnLabel}
            onPress={this.handleLogout}
          />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000',
    flex: 1,
  },
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
