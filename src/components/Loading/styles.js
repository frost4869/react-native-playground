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
    width: 150,
    height: 150,
    backgroundColor: '#c6c6c6',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  spinner: {},
});

export default styles;
