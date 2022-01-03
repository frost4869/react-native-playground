import {StyleSheet} from 'react-native';
import {border_radius} from '../../themes/constants';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: border_radius,
    flex: 1,
  },
  description: {
    padding: 8,
    marginBottom: 3,
  },
});

export default styles;
