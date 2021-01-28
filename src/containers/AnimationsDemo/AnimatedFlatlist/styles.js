import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 80,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 16,
  },
});

export default styles;
