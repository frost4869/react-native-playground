import appleAuth, {
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-community/async-storage';
import {action, observable} from 'mobx';
import trackApi from '../api/trackApi';
import constants from '../constants';

class AuthStore {
  constructor(rootstore) {
    this.rootstore = rootstore;
  }

  @observable isLoading = false;
  @observable error;
  @observable isAuthenticated = false;
  @observable email;

  @action
  login = async ({email, password}) => {
    try {
      this.isLoading = true;
      this.error = undefined;
      const resp = await trackApi.post('/signin', {
        email,
        password,
      });
      if (resp.ok && resp.data) {
        const {token} = resp.data;
        AsyncStorage.setItem(constants.ASYNC_ACCESS_TOKEN, token);
        this.isAuthenticated = true;
        this.email = email;
      } else {
        this.error = resp.data;
      }
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  };

  @action
  appleAuth = async () => {
    try {
      this.isLoading = true;
      this.error = undefined;
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
        const {identityToken: token, nonce} = appleAuthRequestResponse;
        const resp = await trackApi.post('/apple', {
          appleId: token,
          nonce,
        });
        if (resp.ok && resp.data) {
          const {token: accessToken, email} = resp.data;
          AsyncStorage.setItem(constants.ASYNC_ACCESS_TOKEN, accessToken);
          this.isAuthenticated = true;
          this.email = email;
        } else {
          this.error = resp.data;
        }
      } else {
        this.error = {
          message: 'Authentication failed',
        };
      }
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  };

  @action
  overrideLogin = () => {
    this.isAuthenticated = true;
  };

  @action
  logout = () => {
    this.isAuthenticated = false;
    this.email = null;
  };
}

export default AuthStore;
