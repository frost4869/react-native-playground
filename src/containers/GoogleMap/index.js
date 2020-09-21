import _ from 'lodash';
import {reaction, when} from 'mobx';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';
import {Circle, Marker, MarkerAnimated} from 'react-native-maps';
import CurrentLocationButton from '../../components/CurrentLocationButton';
import MapViewDirections from '../../components/CustomMapDirection';
import CustomMapView from '../../components/CustomMapView';
import SearchLocationBottomSheet from '../../components/SearchBottomSheet';
import {
  calculateDeltaFromList,
  getCenterFromList,
  getRawDistance,
  regionFrom,
} from '../../utils';
import RandomButton from './component/RandomButton';

const defaultLocation = {latitude: 10.7786477, longitude: 106.6997759};
const LAT_DELTA = 0.001;
const LONG_DELTA = 0.001;

const originPin = require('../../assets/origin-pin.png');
const destinationPin = require('../../assets/dest-pin.png');
@inject('locationStore')
@observer
class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const {locationStore} = this.props;
    locationStore.trackingLocation();
    this.originDestinationListener();
    this.currentLocationListener();
  }

  currentLocationListener = () => {
    const {locationStore} = this.props;
    this.currentLocationSubsciber = when(
      () => !_.isEmpty(locationStore.currentLocation),
      () => {
        this.handleMoveToCurrentLocation();
      },
    );
  };

  originDestinationListener = () => {
    const {locationStore} = this.props;

    this.originDestinationLSubscriber = reaction(
      () => {
        const {origin, destination} = locationStore;
        const originLat = _.get(origin, 'latitude', 0);
        const originLng = _.get(origin, 'longitude', 0);
        const destinationLat = _.get(destination, 'latitude', 0);
        const destinationLng = _.get(destination, 'longitude', 0);
        return [originLat, originLng, destinationLat, destinationLng].join(',');
      },
      () => {
        this.handleMoveToCenterPoint();
        locationStore.findNearestPoiToDestination();
        locationStore.findNearestPoiToOrigin();
      },
      {
        delay: 500,
      },
    );
  };

  handleMoveToCenterPoint = () => {
    const {locationStore} = this.props;
    if (locationStore.origin && locationStore.destination) {
      const coords = [
        {
          latitude: locationStore.origin.latitude,
          longitude: locationStore.origin.longitude,
        },
        {
          latitude: locationStore.destination.latitude,
          longitude: locationStore.destination.longitude,
        },
      ];
      const centerPoint = getCenterFromList(coords);
      const deltas = calculateDeltaFromList(centerPoint, coords);
      this.mapRef.current.animateToRegion({
        ...centerPoint,
        ...deltas,
      });
    }
  };

  componentWillUnmount() {
    const {locationStore} = this.props;
    locationStore.unsubscribeLocationUpdate();
    this.originDestinationLSubscriber();
  }

  renderDirection = () => {
    const {locationStore} = this.props;
    const {nearestPointToOrigin, nearestPointToDestination} = locationStore;
    if (nearestPointToOrigin && nearestPointToDestination) {
      return (
        <MapViewDirections
          origin={locationStore.getNearestPoiToOrigin}
          destination={locationStore.getNearestPoiToDestination}
          apikey={Config.GOOGLE_MAP_TOKEN}
          strokeWidth={3}
          strokeColor="cyan"
        />
      );
    }

    return null;
  };
  renderDestination = () => {
    const {locationStore} = this.props;
    const {destination} = locationStore;
    if (destination && destination.latitude && destination.longitude) {
      const {latitude, longitude} = destination;
      return (
        <MarkerAnimated
          coordinate={{latitude, longitude}}
          image={destinationPin}
        />
      );
    }

    return null;
  };
  renderOrigin = () => {
    const {locationStore} = this.props;
    const {origin} = locationStore;
    if (origin && origin.latitude && origin.longitude) {
      const {latitude, longitude} = origin;
      return (
        <MarkerAnimated coordinate={{latitude, longitude}} image={originPin} />
      );
    }

    return null;
  };
  renderCircle = () => {
    const {locationStore} = this.props;
    const {origin, destination} = locationStore;

    if (locationStore.origin && locationStore.destination) {
      const coords = [
        {
          latitude: locationStore.origin.latitude,
          longitude: locationStore.origin.longitude,
        },
        {
          latitude: locationStore.destination.latitude,
          longitude: locationStore.destination.longitude,
        },
      ];
      const centerPoint = getCenterFromList(coords);
      const radius = getRawDistance(
        origin.latitude,
        origin.longitude,
        destination.latitude,
        destination.longitude,
      );
      return <Circle center={centerPoint} radius={(radius * 1000) / 2} />;
    }
    return null;
  };
  renderRandomPoints = () => {
    const {locationStore} = this.props;
    return (
      locationStore.getRandomPoints &&
      locationStore.getRandomPoints.map((location) => (
        <Marker coordinate={location} key={location.latitude} />
      ))
    );
  };

  handleMoveToCurrentLocation = () => {
    const {locationStore} = this.props;
    const {currentLocation, origin, destination} = locationStore;
    if (origin && destination) {
      this.handleMoveToCenterPoint();
    } else if (currentLocation) {
      const latitude = _.get(currentLocation, 'latitude');
      const longitude = _.get(currentLocation, 'longitude');
      this.mapRef.current.animateToRegion(
        regionFrom(latitude, longitude, 2000),
        1000,
      );
    }
  };

  renderNearestPoiToOriginPath = () => {
    const {locationStore} = this.props;
    const {origin} = locationStore;
    const location = locationStore.getNearestPoiToOrigin;
    if (location) {
      return (
        <MapViewDirections
          origin={{
            latitude: origin.latitude,
            longitude: origin.longitude,
          }}
          destination={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          apikey={Config.GOOGLE_MAP_TOKEN}
          strokeWidth={4}
          strokeColor="red"
        />
      );
    }
  };
  renderNearestPoiToDestinationPath = () => {
    const {locationStore} = this.props;
    const {destination} = locationStore;
    const location = locationStore.getNearestPoiToDestination;
    if (location) {
      return (
        <MapViewDirections
          origin={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          destination={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          apikey={Config.GOOGLE_MAP_TOKEN}
          strokeWidth={4}
          strokeColor="red"
        />
      );
    }
  };

  render() {
    const {locationStore, navigation} = this.props;
    const {currentLocation} = locationStore;
    const latitude = _.get(
      currentLocation,
      'latitude',
      defaultLocation.latitude,
    );
    const longitude = _.get(
      currentLocation,
      'longitude',
      defaultLocation.longitude,
    );
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <CustomMapView
            ref={this.mapRef}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LAT_DELTA,
              longitudeDelta: LONG_DELTA,
            }}>
            {this.renderDirection()}
            {this.renderDestination()}
            {this.renderOrigin()}
            {this.renderCircle()}
            {this.renderRandomPoints()}
            {this.renderNearestPoiToOriginPath()}
            {this.renderNearestPoiToDestinationPath()}
          </CustomMapView>
          <CurrentLocationButton onPress={this.handleMoveToCurrentLocation} />
          <RandomButton />
        </View>

        <Text>{locationStore.getCurrentLocation}</Text>

        <SearchLocationBottomSheet navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GoogleMap;
