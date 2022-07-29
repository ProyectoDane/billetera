import { formatNumber } from 'react-native-currency-input';

export const formatNum = (value) =>
  formatNumber(value, {
    separator: ',',
    prefix: '$',
    precision: 2,
    delimiter: '.',
    signPosition: 'beforePrefix',
  });

export const formatAmount = (value, withDecimals = null, withDots = null) => {
  const decimalsNeeded = withDecimals === null ? Number(value) - Math.floor(value) !== 0 : withDecimals;
  const dotNeeded = withDots === null ? Number(value) - 10000 > 0 : withDots;

  return formatNumber(value, {
    separator: ',',
    prefix: '$',
    delimiter: dotNeeded ? '.' : '',
    precision: decimalsNeeded ? 2 : 0,
    signPosition: 'beforePrefix',
  });
};
