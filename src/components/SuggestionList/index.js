import {inject, observer} from 'mobx-react';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

const SuggestionList = ({locationSuggestionStore, onSelectLocation}) => {
  const {results, isLoading} = locationSuggestionStore;

  const handleRenderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onSelectLocation(item.place_id)}>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={results}
          renderItem={handleRenderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default inject('locationSuggestionStore')(observer(SuggestionList));
