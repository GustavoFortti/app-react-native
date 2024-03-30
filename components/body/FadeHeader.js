// FadeHeader.js
import React, { useEffect, useState } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import Separator from './Separator';
import { View } from 'react-native-animatable';

const FadeHeader = ({ children, scrollY, headerZIndex }) => {
  const [headerDisplay, setHeaderDisplay] = useState('flex');

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    let timeoutId;


    const updateHeaderDisplay = ({ value }) => {
      clearTimeout(timeoutId);
      if (value > 50) {
        timeoutId = setTimeout(() => {
          setHeaderDisplay('none');
        }, 500);
      } else {
        setHeaderDisplay('flex');
      }
    };

    const id = scrollY.addListener(updateHeaderDisplay);

    return () => {
      scrollY.removeListener(id);
      clearTimeout(timeoutId);
    };
  }, [scrollY]);

  return (
    <Animated.View
      style={[
        styles.headContainer,
        {
          opacity: headerOpacity,
          display: headerDisplay,
          zIndex: headerZIndex
        },
      ]}
    >
      <View
        style={{
          width: "100%",
          // backgroundColor: "red",
          justifyContent: "flex-end",
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "20%",
    // backgroundColor: "blue",
    backgroundColor: "transparent",
  },
});

export default FadeHeader;
