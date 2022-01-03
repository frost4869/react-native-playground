/* eslint-disable react-native/no-inline-styles */
import * as LocalAuth from 'expo-local-authentication';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/FormComponents/Button';
import { border_radius } from '../../themes/constants';

const Biometric = ({params}) => {
  const [hardwareSupported, setHardwareSupported] = useState(false);
  const [authType, setAuthType] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bioError, setBioError] = useState();

  const checkHardwareSupported = () => {
    LocalAuth.hasHardwareAsync().then((result) => {
      setHardwareSupported(result);
    });
  };

  const checkAuthType = () => {
    const Types = LocalAuth.AuthenticationType;
    const availableTypes = [];
    LocalAuth.supportedAuthenticationTypesAsync().then((results) => {
      for (const key in Types) {
        if (Types.hasOwnProperty(key)) {
          const type = Types[key];
          if (results.includes(type)) {
            availableTypes.push(key);
          }
        }
      }
      setAuthType(availableTypes);
    });
  };

  const checkEnrolled = () => {
    LocalAuth.isEnrolledAsync().then((result) => {
      setIsEnrolled(result);
    });
  };

  useEffect(() => {
    checkHardwareSupported();
    checkAuthType();
    checkEnrolled();
  }, []);

  const handleBioAuthen = () => {
    LocalAuth.authenticateAsync({
      promptMessage: 'Authentication with biometrics.',
    })
      .then((result) => {
        setIsAuthenticated(result.success);
        setBioError(result.error);
      })
      .catch((err) => {
        setBioError(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Hardware supported: {hardwareSupported.toString()}</Text>
      <Text>Authentication type: {authType.join(', ')}</Text>
      <Text>Data enrolled: {isEnrolled.toString()}</Text>
      <Text style={[styles.h3, styles.status]}>
        Authenticated:{' '}
        <Text style={{color: isAuthenticated ? 'blue' : 'red'}}>
          {isAuthenticated.toString()}
        </Text>
      </Text>
      {hardwareSupported && (
        <Button
          label="Authentication with biometric"
          style={styles.faceidBtn}
          onPress={handleBioAuthen}
          labelStyle={styles.h3}
        />
      )}
      {bioError && <Text>error: {bioError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  faceidBtn: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: border_radius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  status: {
    marginVertical: 26,
  },
  icon: {
    marginLeft: 8,
  },
});

export default Biometric;
