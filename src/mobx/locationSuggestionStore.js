import {create} from 'apisauce';
import {action, observable} from 'mobx';
import Config from 'react-native-config';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import api from '../api';

export default class LocationSuggestionStore {
  constructor(_rootStore) {
    this.rootStore = _rootStore;
  }

  @observable isLoading = false;
  @observable results = [];
  sessionToken = null;

  @action
  fetchSuggestions = async keyword => {
    this.isLoading = true;
    const {locationStore} = this.rootStore;
    const {currentLocation} = locationStore;
    const latitude = _.get(currentLocation, 'latitude', '');
    const longitude = _.get(currentLocation, 'longitude', '');
    const resp = await api.get('/place/autocomplete/json', {
      input: keyword,
      key: Config.GOOGLE_MAP_TOKEN,
      sessionToken: this.sessionToken,
      geocode: 'vn',
      location: [latitude, longitude].join(','),
      radius: 30000,
    });
    if (resp.ok) {
      const {predictions, status} = resp.data;
      if (status === 'OK') {
        this.results = predictions;
      }
    }
    this.isLoading = false;
  };

  @action
  clearResults = () => {
    this.results = [];
  };

  generateSessionToken = () => {
    this.sessionToken = uuidv4();
    console.log('this.sessionToken :>> ', this.sessionToken);
  };

  clearSessionToken = () => {
    this.sessionToken = null;
  };
}
