import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Header = ({ children, scrollY, heightSize }) => {
  const translateY = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, -500],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [{ translateY }],
          height: heightSize,
          opacity,
        },
      ]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1
  },
});

export default Header;
