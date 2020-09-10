import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 8,
    backgroundColor: '#fff',
    height: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    flexDirection: 'row',
  },
  contentContainer: {
    marginHorizontal: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputBtn: {
    padding: 16,
    marginVertical: 8,
    flex: 1,
  },
  pins: {
    width: 30,
    height: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
  },
});

export default styles;
