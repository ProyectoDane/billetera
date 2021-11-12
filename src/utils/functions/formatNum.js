import { formatNumber } from 'react-native-currency-input';

export const formatNum = (value) =>
  formatNumber(value, {
    separator: ',',
    prefix: '$',
    precision: 2,
    delimiter: '.',
    signPosition: 'beforePrefix',
  });
