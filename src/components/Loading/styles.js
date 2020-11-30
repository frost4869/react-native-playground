import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  onTopContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
    flex: 1,
    zIndex: 2,
  },
  spinnerContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  spinner: {},
});

export default styles;
