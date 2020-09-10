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
  overrideLogin = () => {
    this.isAuthenticated = true;
  };
}

export default AuthStore;
