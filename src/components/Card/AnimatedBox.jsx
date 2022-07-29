import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Animated, { EasingNode } from 'react-native-reanimated';

class AnimatedBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      height: 0,
    };
  }

  componentDidUpdate(_, prevState) {
    if (this.state.init && prevState.open !== this.props.open) {
      this.showContent();
    }
  }

  adjustHeight(layout) {
    const height = Math.round(layout.height);
    this.setState({
      init: true,
      height: new Animated.Value(this.props.open ? height : 0),
      interpol: {
        inputRange: [0, 1],
        outputRange: [0, height],
      },
    });
  }

  showContent() {
    const { height } = this.state;

    Animated.timing(height, {
      toValue: this.props.open ? 1 : 0,
      duration: 250,
      easing: EasingNode.inOut(EasingNode.ease),
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { height, interpol } = this.state;
    let animHeight = height;
    if (this.state.init) {
      animHeight = height.interpolate(interpol);
    }
    return (
      <Animated.View style={{ position: 'relative', height: animHeight, overflow: 'hidden' }}>
        <View
          style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          onLayout={(event) => {
            this.adjustHeight(event.nativeEvent.layout);
          }}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

AnimatedBox.propTypes = {
  open: PropTypes.bool,
};

AnimatedBox.defaultProps = {
  open: false,
};

export default AnimatedBox;
