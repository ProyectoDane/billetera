import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgCalculator = (props) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M17 24H5a5.006 5.006 0 0 1-5-5V5a5.006 5.006 0 0 1 5-5h12a5.006 5.006 0 0 1 5 5v14a5.006 5.006 0 0 1-5 5ZM5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm10 8H7a3 3 0 1 1 0-6h8a3 3 0 1 1 0 6ZM7 6a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H7Zm-2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-8 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm8-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm1 5a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1Z"
      fill="#484848"
    />
  </Svg>
);

export default SvgCalculator;
