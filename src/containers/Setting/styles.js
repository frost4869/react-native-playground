import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  button: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 15,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 24,
  },
  dot: {
    width: 20,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    bottom: 50,
    position: 'absolute',
  },
  slider: {
    width: '80%',
  },
});

export default styles;
