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
    margin: 16,
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
  button: {
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    width: '100%',
    marginTop: 16,
    alignSelf: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
