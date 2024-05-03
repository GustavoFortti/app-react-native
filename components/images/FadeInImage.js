import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated } from 'react-native';

const FadeInImage = ({ item, style }) => {
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
    <View style={[{ padding: 10, backgroundColor: "grey"}, style]} >
      <Animated.Image
        resizeMode='contain'
        source={{
          uri: item,
        }}
        onLoad={() => setIsImageLoaded(true)}
        style={[{
          marginTop: 0,
          opacity: fadeAnim,
        }, style]}
        onError={(e) => {
          e.nativeEvent.error;
        }}
      />
    </View>
  );
};

export default FadeInImage;
