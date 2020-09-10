import _ from 'lodash';
import {action, computed, observable, runInAction, toJS} from 'mobx';
import RandomLocation from 'random-location';
import Config from 'react-native-config';
import GeoLocation from 'react-native-geolocation-service';
import api from '../api';
import constants from '../constants';
import {getCenterFromList, getRawDistance} from '../utils';

export default class LocationStore {
  @observable currentLocation = null;
  @observable origin = null;
  @observable destination = null;
  @observable nearestPointToOrigin = null;
  @observable nearestPointToDestination = null;
  @observable paths = [];
  @observable searchMode = null;
  @observable isLoading = false;
  @observable randomPoints = [];

  constructor(_rootStore) {
    this.rootStore = _rootStore;
  }

  @action
  trackingLocation = () => {
    this.watchId = GeoLocation.watchPosition(
      (location) => {
        const {coords} = location;
        const {latitude, longitude, heading} = coords;
        runInAction(() => {
          this.currentLocation = {
            latitude,
            longitude,
            heading,
          };
          this.paths.push({latitude, longitude});
        });
      },
      (error) => {
        console.log('error :>> ', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        showLocationDialog: true,
        useSignificantChanges: false,
      },
    );
  };

  @action
  fetchLocationDetail = async (place_id) => {
    try {
      this.isLoading = true;
      const resp = await api.get('/place/details/json', {
        key: Config.GOOGLE_MAP_TOKEN,
        place_id,
      });
      if (resp.ok && resp.data) {
        const {result} = resp.data;
        const address = _.get(result, 'formatted_address', '');
        const latitude = _.get(result, ['geometry', 'location', 'lat']);
        const longitude = _.get(result, ['geometry', 'location', 'lng']);

        if (this.searchMode === constants.SEARCH_MODE.ORIGIN) {
          this.setOrigin({
            address,
            latitude,
            longitude,
          });
        } else {
          this.setDestination({
            address,
            latitude,
            longitude,
          });
        }
      }
    } catch (error) {
      this.isLoading = false;
      console.log('error when fetch place details :>> ', error);
    } finally {
      this.isLoading = false;
    }
  };

  unsubscribeLocationUpdate = () => {
    this.watchId && GeoLocation.clearWatch(this.watchId);
  };

  @action
  setSearchMode = (mode) => {
    this.searchMode = mode;
  };

  @action
  setOrigin = (data) => {
    this.origin = data;
    const {locationSuggestionStore} = this.rootStore;
    locationSuggestionStore.clearSessionToken();
  };

  @action
  setDestination = (data) => {
    this.destination = data;
    const {locationSuggestionStore} = this.rootStore;
    locationSuggestionStore.clearSessionToken();
  };

  @action
  generateRandomPoints = () => {
    if (this.origin && this.destination) {
      const coords = [
        {
          latitude: this.origin.latitude,
          longitude: this.origin.longitude,
        },
        {
          latitude: this.destination.latitude,
          longitude: this.destination.longitude,
        },
      ];
      const centerPoint = getCenterFromList(coords);
      let points = [];
      for (let i = 0; i < 20; i++) {
        points.push(RandomLocation.randomCirclePoint(centerPoint, 10000));
      }
      this.randomPoints = points;
      this.findNearestPoiToDestination();
      this.findNearestPoiToOrigin();
    }
  };

  @action
  findNearestPoiToOrigin = () => {
    if (this.origin && this.randomPoints.length) {
      let found;
      let temp = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < this.randomPoints.length; i++) {
        const point = this.randomPoints[i];
        const distance = getRawDistance(
          this.origin.latitude,
          this.origin.longitude,
          point.latitude,
          point.longitude,
        );
        if (distance < temp) {
          temp = distance;
          found = point;
        }
      }
      this.nearestPointToOrigin = found;
    }
  };
  @action
  findNearestPoiToDestination = () => {
    if (this.destination && this.randomPoints.length) {
      let found;
      let temp = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < this.randomPoints.length; i++) {
        const point = this.randomPoints[i];
        const distance = getRawDistance(
          this.destination.latitude,
          this.destination.longitude,
          point.latitude,
          point.longitude,
        );
        if (distance < temp) {
          temp = distance;
          found = point;
        }
      }
      this.nearestPointToDestination = found;
    }
  };

  @computed get getCurrentLocation() {
    if (this.currentLocation) {
      return `${this.currentLocation.latitude}, ${this.currentLocation.longitude}`;
    }
  }

  @computed get getPaths() {
    return toJS(this.paths);
  }

  @computed get getRandomPoints() {
    return toJS(this.randomPoints);
  }

  @computed get getNearestPoiToOrigin() {
    return this.nearestPointToOrigin;
  }
  @computed get getNearestPoiToDestination() {
    return this.nearestPointToDestination;
  }
}
