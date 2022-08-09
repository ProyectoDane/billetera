import * as React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

const SvgInformation = ({ size = 24, color = '#484848', style = {} }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    style={StyleSheet.flatten([{ borderRadius: size / 2 }, style])}>
    <G clipPath="url(#a)" fill={color}>
      <Path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0Zm0 22a10 10 0 1 1 10-10 10.012 10.012 0 0 1-10 10Z" />
      <Path d="M12 10h-1a1 1 0 0 0 0 2h1v6a1 1 0 0 0 2 0v-6a2 2 0 0 0-2-2ZM12 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgInformation;
