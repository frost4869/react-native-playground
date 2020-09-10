import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import styles from './styles';
import Input from '../../../../components/FormComponents/Input';
import Button from '../../../../components/FormComponents/Button';

const LoginForm = ({onSubmit}) => {
  const {handleSubmit, control} = useForm();

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
          />
        )}
        name="password"
        rules={{required: true}}
        defaultValue=""
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.loginBtn}
        label="Login"
      />
    </View>
  );
};

export default LoginForm;
