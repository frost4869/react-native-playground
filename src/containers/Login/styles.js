import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: 16,
    color: 'red',
  },
  button: {
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    width: '100%',
    marginTop: 16,
    alignSelf: 'center',
  },
  btnLabel: {
    color: 'black',
  },
});

export default styles;
