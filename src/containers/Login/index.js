import {inject, observer} from 'mobx-react';
import React from 'react';
import {View} from 'react-native';
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
  return (
    <View style={styles.container}>
      <LoginForm
        onSubmit={handleLogin}
        onOverrideLogin={overrideLogin}
        onAppleAuth={handleAppleAuth}
      />

      <Loading visible={isLoading} />
    </View>
  );
};

export default inject('authStore')(observer(LoginScreen));
