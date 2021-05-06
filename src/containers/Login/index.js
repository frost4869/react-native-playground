/* eslint-disable react-native/no-inline-styles */
import {inject, observer} from 'mobx-react';
import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import Loading from '../../components/Loading';
import ScreenHeader from '../../components/ScreenHeader';
import Txt from '../../components/Txt';
import LoginForm from './components/LoginForm';
import styles from './styles';

const LoginScreen = ({authStore, navigation}) => {
  const {isLoading} = authStore;

  const handleLogin = (data) => {
    // authStore.login(data);
    authStore.firebaseEmailPassAuth(data.email, data.password);
  };
  const handleRegister = (data) => {
    authStore.firebaseEmailPassAuthRegister(data.email, data.password);
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
  const handleGoogleAuth = () => {
    authStore.firebaseLoginGoogle();
  };
  const handleFBAuth = () => {
    authStore.firebaseLoginFB();
  };
  const handleTwitterAuth = () => {
    authStore.firebaseLoginTwitter();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <ScreenHeader title="Let's sign you in" onBack={() => navigation.pop()} />
        <Txt style={styles.h3}>
          Although you don't have an account, just give the design a try !
        </Txt>

        <LoginForm
          onSubmit={handleLogin}
          onRegister={handleRegister}
          onOverrideLogin={overrideLogin}
          onAppleAuth={handleAppleAuth}
          handleAppleOauth={handleAppleOauth}
          handleGoogleAuth={handleGoogleAuth}
          handleFBAuth={handleFBAuth}
          handleTwitterAuth={handleTwitterAuth}
        />

        <Loading visible={isLoading} />
      </View>
    </SafeAreaView>
  );
};

export default inject('authStore')(observer(LoginScreen));
