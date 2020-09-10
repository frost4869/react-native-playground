import React from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const CustomMapView = React.forwardRef(
  ({type, style, children, ...rest}, ref) => {
    return (
      <MapView
        ref={ref}
        style={[styles.container, {...style}]}
        showsUserLocation
        mapPadding={{
          top: 0,
          bottom: 0,
          left: 40,
          right: 40,
        }}
        // provider="google"
        {...rest}>
        {children}
      </MapView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomMapView;
