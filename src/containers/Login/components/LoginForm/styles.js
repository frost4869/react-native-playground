import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},
  loginBtn: {
    backgroundColor: 'pink',
    padding: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  textBtn: {
    marginBottom: 16,
    textAlign: 'center',
  },
  textLabel: {
    textDecorationLine: 'underline',
  },
  appleSigninBtn: {
    width: '100%',
    height: 50,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default styles;
