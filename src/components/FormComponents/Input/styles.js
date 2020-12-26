import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    justifyContent: 'center',
  },
  input: {
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  validationMessage: {
    color: 'red',
  },
  icon: {
    position: 'absolute',
    right: 14,
    fontSize: 20,
  },
});

export default styles;
