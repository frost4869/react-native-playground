import {yupResolver} from '@hookform/resolvers';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import * as Yup from 'yup';
import Button from '../../../../components/FormComponents/Button';
import Input from '../../../../components/FormComponents/Input';
import Txt from '../../../../components/Txt';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('This field is required'),
  password: Yup.string().required('This field is required'),
});

const LoginForm = ({
  onSubmit,
  onRegister,
  onAppleAuth,
  authStore,
  handleAppleOauth,
  handleGoogleAuth,
  handleFBAuth,
  handleTwitterAuth,
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button
          onPress={handleSubmit(onSubmit)}
          style={styles.haftButton}
          labelStyle={styles.buttonLabel}
          label="Login"
        />
        <Button
          onPress={handleSubmit(onRegister)}
          style={styles.haftButton}
          labelStyle={styles.buttonLabel}
          label="Sign up"
        />
      </View>

      <Txt style={styles.textBtn}>Or</Txt>

      <View style={styles.socialContainer}>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity style={styles.socialIconWrapper} onPress={onAppleAuth}>
            <Icon name="apple" size={30} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.socialIconWrapper} onPress={handleAppleOauth}>
            <Icon name="apple" size={30} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.socialIconWrapper} onPress={handleGoogleAuth}>
          <Icon name="google" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIconWrapper} onPress={handleFBAuth}>
          <Icon name="facebook-f" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIconWrapper} onPress={handleTwitterAuth}>
          <Icon name="twitter" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default inject('authStore')(observer(LoginForm));
