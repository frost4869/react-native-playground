import {create} from 'apisauce';
import AsyncStorage from '@react-native-community/async-storage';
import constants from '../constants';

const trackApi = create({
  baseURL: 'https://playground-expressjs.herokuapp.com/',
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem(
      constants.ASYNC_ACCESS_TOKEN,
    )}`,
  },
});

export default trackApi;
