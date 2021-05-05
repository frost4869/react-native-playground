import {yupResolver} from '@hookform/resolvers';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, ScrollView, View} from 'react-native';
import * as Yup from 'yup';
import Button from '../../../../components/FormComponents/Button';
import Input from '../../../../components/FormComponents/Input';
import Txt from '../../../../components/Txt';
import styles from './styles';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('This field is required'),
  password: Yup.string().required('This field is required'),
});

const LoginForm = ({
  onSubmit,
  onAppleAuth,
  authStore,
  handleAppleOauth,
  handleGoogleAuth,
  handleFBAuth,
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
            style={styles.input}
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
            password
            error={errors.password}
            style={styles.input}
          />
        )}
        name="password"
        rules={{required: true}}
        defaultValue=""
      />

      {authStore.error && <Txt style={styles.errorMessage}>{authStore.error.message}</Txt>}

      {/* BUTTONS */}
      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.loginBtn}
        labelStyle={styles.buttonLabel}
        label="Login"
      />
      <Txt style={styles.textBtn}>Or</Txt>
      <ScrollView>
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
          style={[styles.button, styles.loginBtn]}
          labelStyle={styles.buttonLabel}
          onPress={handleAppleOauth}
        />
        <Button
          label="Google"
          style={[styles.button, styles.loginBtn]}
          labelStyle={styles.buttonLabel}
          onPress={handleGoogleAuth}
        />
        <Button
          label="Facebook"
          style={[styles.button, styles.loginBtn]}
          labelStyle={styles.buttonLabel}
          onPress={handleFBAuth}
        />
      </ScrollView>
    </View>
  );
};

export default inject('authStore')(observer(LoginForm));
