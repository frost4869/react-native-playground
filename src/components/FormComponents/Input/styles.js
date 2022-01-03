import {StyleSheet} from 'react-native';
import { border_radius } from '../../../themes/constants';

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    justifyContent: 'center',
  },
  input: {
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: border_radius,
    backgroundColor: '#fff',
    fontFamily: 'Poppins',
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
