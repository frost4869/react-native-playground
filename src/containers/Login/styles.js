import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: 'black',
  },
  h1: {
    marginBottom: 16,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  h3: {
    marginBottom: 16,
    color: 'white',
    fontSize: 14,
    letterSpacing: 1,
    lineHeight: 24,
  },
  backBtn: {
    marginBottom: 25,
  },
  text: {
    marginBottom: 24,
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: 16,
    color: 'red',
  },
  btnLabel: {
    color: 'black',
  },
});

export default styles;
