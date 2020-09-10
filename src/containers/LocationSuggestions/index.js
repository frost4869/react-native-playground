import {inject, observer} from 'mobx-react';
import React, {PureComponent} from 'react';
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import LocationSearchAutoSuggestInput from '../../components/LocationSearchAutoSuggestInput';
import SuggestionList from '../../components/SuggestionList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import constants from '../../constants';
import mockLocations from '../../../mockDestinations';
import LocationTile from '../../components/LocationTiles';

@inject('locationStore', 'locationSuggestionStore')
@observer
class LocationSuggestions extends PureComponent {
  handleSearchInput = keyword => {
    const {locationSuggestionStore} = this.props;
    locationSuggestionStore.fetchSuggestions(keyword);
  };

  handleSelectLocation = async place_id => {
    const {locationStore, navigation, locationSuggestionStore} = this.props;
    await locationStore.fetchLocationDetail(place_id);
    locationSuggestionStore.clearResults();
    navigation.pop();
  };

  handleSetCurrentLocation = () => {
    const {locationStore, locationSuggestionStore, navigation} = this.props;
    const {currentLocation} = locationStore;
    const {latitude, longitude} = currentLocation;
    locationStore.setOrigin({
      address: 'Your location',
      latitude,
      longitude,
    });
    locationSuggestionStore.clearResults();
    navigation.pop();
  };

  handleSelectSavedLocation = location => {
    const {locationStore, locationSuggestionStore, navigation} = this.props;
    const {searchMode, setOrigin, setDestination} = locationStore;
    if (searchMode === constants.SEARCH_MODE.ORIGIN) {
      setOrigin(location);
    } else {
      setDestination(location);
    }
    locationSuggestionStore.clearResults();
    navigation.pop();
  };

  render() {
    const {locationStore} = this.props;
    const {searchMode} = locationStore;

    return (
      <View style={{flex: 1}}>
        <LocationSearchAutoSuggestInput
          onFinishInput={this.handleSearchInput}
          placeholder={`Search for ${locationStore.searchMode.toLowerCase()} ...`}
        />

        {locationStore.isLoading && <ActivityIndicator />}

        {searchMode === constants.SEARCH_MODE.ORIGIN ? (
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={this.handleSetCurrentLocation}>
            <Text style={styles.locationText}>My location</Text>
            <Icon name="my-location" style={styles.locationIcon} />
          </TouchableOpacity>
        ) : null}

        <View style={styles.savedLocationsWrapper}>
          <ScrollView horizontal>
            {mockLocations &&
              mockLocations.map(item => (
                <LocationTile
                  key={item.latitude}
                  content={item.address}
                  onPress={() => this.handleSelectSavedLocation(item)}
                />
              ))}
          </ScrollView>
        </View>

        <SuggestionList onSelectLocation={this.handleSelectLocation} />
      </View>
    );
  }
}

export default LocationSuggestions;
