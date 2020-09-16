import {inject, observer} from 'mobx-react';
import React from 'react';
import {View} from 'react-native';
import Button from '../../components/FormComponents/Button';
import Loading from '../../components/Loading';
import LoginForm from './components/LoginForm';
import styles from './styles';

const LoginScreen = ({authStore}) => {
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
    <View style={styles.container}>
      <LoginForm
        onSubmit={handleLogin}
        onOverrideLogin={overrideLogin}
        onAppleAuth={handleAppleAuth}
      />

      <Button
        label="Oauth Apple Signin"
        style={styles.button}
        labelStyle={styles.btnLabel}
        onPress={handleAppleOauth}
      />

      <Loading visible={isLoading} />
    </View>
  );
};

export default inject('authStore')(observer(LoginScreen));
