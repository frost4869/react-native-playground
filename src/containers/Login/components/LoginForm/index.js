import {AppleButton} from '@invertase/react-native-apple-authentication';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, Text, View} from 'react-native';
import Button from '../../../../components/FormComponents/Button';
import Input from '../../../../components/FormComponents/Input';
import styles from './styles';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers';
import {inject, observer} from 'mobx-react';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('This field is required'),
  password: Yup.string().required('This field is required'),
});

const LoginForm = ({
  onSubmit,
  onOverrideLogin,
  onAppleAuth,
  authStore,
  handleAppleOauth,
}) => {
  const {handleSubmit, control, errors} = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
        )}
        name="email"
        rules={{required: true}}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry
            error={errors.password}
          />
        )}
        name="password"
        rules={{required: true}}
        defaultValue=""
      />

      {authStore.error && (
        <Text style={styles.errorMessage}>{authStore.error.message}</Text>
      )}

      {/* BUTTONS */}
      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.loginBtn}
        labelStyle={styles.buttonLabel}
        label="Login"
      />
      <Text style={styles.textBtn}>Or</Text>
      {Platform.OS === 'ios' && (
        <AppleButton
          onPress={onAppleAuth}
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={styles.appleSigninBtn}
        />
      )}
      <Button
        label="Oauth Apple Signin"
        style={styles.button}
        labelStyle={styles.btnLabel}
        onPress={handleAppleOauth}
      />
      <Button
        label="Don't have account ? Login anyway"
        style={styles.textBtn}
        labelStyle={styles.textLabel}
        onPress={onOverrideLogin}
      />
    </View>
  );
};

export default inject('authStore')(observer(LoginForm));
