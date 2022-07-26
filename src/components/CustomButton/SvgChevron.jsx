import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgChevron = (props) => (
  <Svg viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M.8 14.063c0-.249.098-.487.274-.663L5.87 8.605a1.562 1.562 0 0 0 0-2.21L1.081 1.603A.938.938 0 0 1 2.406.278l4.789 4.788a3.441 3.441 0 0 1 0 4.862L2.4 14.723a.937.937 0 0 1-1.6-.66Z"
      fill="#484848"
    />
  </Svg>
);

export default SvgChevron;
