import React from 'react';
import {View, Text} from 'react-native';
import LoginForm from './components/LoginForm';
import styles from './styles';
import {inject, observer} from 'mobx-react';
import Button from '../../components/FormComponents/Button';

const LoginScreen = ({authStore}) => {
  const handleLogin = (data) => {
    authStore.login(data);
  };
  const overrideLogin = () => {
    authStore.overrideLogin();
  };
  return (
    <View style={styles.container}>
      <LoginForm onSubmit={handleLogin} />
      {authStore.error && (
        <Text style={styles.errorMessage}>{authStore.error.message}</Text>
      )}
      <Button
        label="Login anyway"
        onPress={overrideLogin}
        style={styles.button}
      />
    </View>
  );
};

export default inject('authStore')(observer(LoginScreen));
