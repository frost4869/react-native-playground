import appleAuth, {
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class AppleSigninDemoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
    };
  }

  onAppleButtonPress = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        // user is authenticated
        console.log('appleAuthRequestResponse :>> ', appleAuthRequestResponse);
        this.setState({authedUser: appleAuthRequestResponse});
      }
    } catch (error) {
      console.log('error :>> ', error);
      this.setState({authedUser: error});
    }
  };

  render() {
    const {authedUser} = this.state;
    return (
      <View style={styles.container}>
        <Text>
          Apple Signin Demo. Available on react native verison 0.60 or higher
          Required IOS 13 or higher
        </Text>
        {appleAuth.isSupported ? (
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            onPress={this.onAppleButtonPress}
          />
        ) : (
          <Text>Your device does not support Apple Signin</Text>
        )}

        <View style={styles.userinfo}>
          {authedUser &&
            Object.keys(authedUser).map((key) => {
              const field = authedUser[key];
              return (
                <Text key={key} style={styles.key}>
                  {key}:{' '}
                  <Text style={styles.value}>{JSON.stringify(field)}</Text>
                </Text>
              );
            })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  appleButton: {
    width: '90%', // You must specify a width
    height: 45, // You must specify a height
    marginTop: 20,
  },
  key: {
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'normal',
  },
  userinfo: {
    marginTop: 8,
  },
});
