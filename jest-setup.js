import 'setimmediate';
import { Alert } from 'react-native';
import '@testing-library/jest-dom';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    SimpleLineIcons: View,
    Ionicons: View,
    FontAwesome5: View,
  };
});

jest.spyOn(Alert, 'alert');
