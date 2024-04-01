import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';

const FadeInImageButton = ({ children, source, buttonName, imageStyle, onButtonPress }) => {
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
    <TouchableOpacity
      onPress={() => onButtonPress(buttonName)}
    >
      <Animated.Image
        resizeMode='cover'
        source={source}
        onLoad={() => setIsImageLoaded(true)}
        style={[
          styles.image,
          imageStyle,
          {
            opacity: fadeAnim,
          },
        ]}
      />
      <View style={[
        styles.overlay,
        imageStyle,
      ]}>
        {isImageLoaded && children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
});

export default FadeInImageButton;
