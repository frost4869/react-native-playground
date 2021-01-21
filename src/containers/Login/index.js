/* eslint-disable react-native/no-inline-styles */
import {inject, observer} from 'mobx-react';
import React from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity, View} from 'react-native';
import Loading from '../../components/Loading';
import LoginForm from './components/LoginForm';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import Txt from '../../components/Txt';

const LoginScreen = ({authStore, navigation}) => {
  const {isLoading} = authStore;

  const handleLogin = (data) => {
    authStore.login(data);
  };
  const overrideLogin = () => {
    authStore.overrideLogin();
  };
  const handleAppleAuth = () => {
    authStore.appleAuth();
  };
  const handleAppleOauth = () => {
    authStore.appleOauth();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.pop()}
          style={styles.backBtn}>
          <Icon name="back" color="white" size={28} />
        </TouchableOpacity>

        <View style={styles.Txt}>
          <Txt style={styles.h1}>Let's sign you in.</Txt>
          <Txt style={styles.h3}>
            Although you don't have an account, just give the design a try !
          </Txt>
        </View>

        <LoginForm
          onSubmit={handleLogin}
          onOverrideLogin={overrideLogin}
          onAppleAuth={handleAppleAuth}
          handleAppleOauth={handleAppleOauth}
        />

        <Loading visible={isLoading} />
      </View>
    </SafeAreaView>
  );
};

export default inject('authStore')(observer(LoginScreen));
