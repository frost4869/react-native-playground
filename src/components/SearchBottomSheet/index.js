import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import {inject, observer} from 'mobx-react';
import constants from '../../constants';

const originPin = require('../../assets/origin-pin.png');
const destinationPin = require('../../assets/dest-pin.png');

const SearchLocationBottomSheet = ({
  navigation,
  locationStore,
  locationSuggestionStore,
}) => {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Where to go ?</Text>
    </View>
  );

  const handleSearchOrigin = () => {
    locationStore.setSearchMode(constants.SEARCH_MODE.ORIGIN);
    navigation.navigate('LocationSuggestions');
    locationSuggestionStore.generateSessionToken();
  };
  const handleSearchDestination = () => {
    locationStore.setSearchMode(constants.SEARCH_MODE.DESTINATION);
    navigation.navigate('LocationSuggestions');
    locationSuggestionStore.generateSessionToken();
  };

  const renderContent = () => {
    const {origin, destination} = locationStore;
    return (
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Image source={originPin} style={styles.pins} />
          <TouchableOpacity
            onPress={handleSearchOrigin}
            style={styles.inputBtn}>
            {origin && origin.address ? (
              <Text>{origin.address}</Text>
            ) : (
              <Text>Where you from ?</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Image source={destinationPin} style={styles.pins} />
          <TouchableOpacity
            onPress={handleSearchDestination}
            style={styles.inputBtn}>
            {destination && destination.address ? (
              <Text>{destination.address}</Text>
            ) : (
              <Text>Where you wanna go ?</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};

export default inject('locationStore', 'locationSuggestionStore')(
  observer(SearchLocationBottomSheet),
);
