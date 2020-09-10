import {create} from 'apisauce';
import AsyncStorage from '@react-native-community/async-storage';
import constants from '../constants';

const trackApi = create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem(
      constants.ASYNC_ACCESS_TOKEN,
    )}`,
  },
});

export default trackApi;
