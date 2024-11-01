import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedBox = ({ open = false, children }) => {
  const [layoutHeight, setLayoutHeight] = useState(0);
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withTiming(open ? layoutHeight : 0, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });
  }, [open, layoutHeight]);

  const animatedStyle = useAnimatedStyle(() => ({ height: height.value }));

  const onLayout = useCallback((event) => setLayoutHeight(event.nativeEvent.layout.height),[]);

  return (
    <Animated.View style={[{ overflow: 'hidden' }, animatedStyle]}>
      <View
        onLayout={onLayout}
        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

AnimatedBox.propTypes = {
  open: PropTypes.bool,
};


export default AnimatedBox;
