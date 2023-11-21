import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated } from 'react-native';

const FadeInImageDetails = ({ source }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isImageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, isImageLoaded]);

  return (
    <>
      <Animated.Image
        resizeMode='contain'
        source={source}
        onLoad={() => setIsImageLoaded(true)}
        style={{
          marginTop: "25%",
          justifyContent: "center",
          height: "50%",
          width: "100%",
          opacity: fadeAnim,
        }}
      />
    </>
  );
};

export default FadeInImageDetails;
