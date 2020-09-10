import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';

const RandomLocationsButton = ({locationStore}) => {
  const handleGenRandomLocations = () => {
    locationStore.generateRandomPoints();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleGenRandomLocations}>
      <Icon style={styles.icon} name="random" />
      <Text>POIs</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    flexDirection: 'row',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default inject('locationStore')(observer(RandomLocationsButton));
