import React, { useState, useEffect } from 'react';
import { Animated, Easing, Text } from 'react-native';

const FadeText = ({ text, duration = 1000, style }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text style={style}>{text}</Text>
    </Animated.View>
  );
};

export default FadeText;
