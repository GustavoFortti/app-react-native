// FadeHeader.js
import React, { useEffect, useState } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants'; // Adjust the import path as necessary

const FadeHeader = ({ children, style, scrollY }) => {
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
        timeoutId = setTimeout(() => setHeaderDisplay('none'), 500);
      } else {
        setHeaderDisplay('flex');
      }
    };

    // Add listener to the scrollY animated value
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
         },
        style 
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    zIndex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
});

export default FadeHeader;
