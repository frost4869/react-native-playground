import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},
  haftButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    alignSelf: 'center',
  },
  loginBtn: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  textBtn: {
    margin: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
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
    color: 'white',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderColor: 'white',
    backgroundColor: 'black',
    color: 'white',
    letterSpacing: 1,
    fontWeight: '600',
  },
});

export default styles;
