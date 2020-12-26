import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: 'black',
  },
  h1: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 1.5,
  },
  logo: {
    alignSelf: 'center',
  },
  h3: {
    color: 'white',
    opacity: 0.9,
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: 2,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentContainer: {
    flex: 1,
  },
  footerContainer: {
    backgroundColor: '#354341',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 14,
  },
  goBtn: {
    width: '50%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  signinBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
});

export default styles;
