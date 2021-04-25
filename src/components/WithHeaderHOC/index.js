import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ScreenHeader from '../ScreenHeader';

export default (config) => (WrappedComponent) => {
  const hocComponent = ({navigation, route, ...props}) => {
    const {title, hasBack} = config;
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
    return (
      <>
        <SafeAreaView style={{backgroundColor: '#000'}} />
        <ScreenHeader
          title={title || route.name}
          style={styles.header}
          onBack={hasBack ? () => navigation.pop() : undefined}
        />
        <WrappedComponent {...props} />
      </>
    );
  };

  return hocComponent;
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#000',
  },
});

