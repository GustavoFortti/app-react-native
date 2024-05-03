import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, useWindowDimensions } from 'react-native';

const FadeInImage = ({ 
  item, 
  styleImg, 
  styleView,
  height_percent,
  width_percent
 }) => {
  const { height, width } = useWindowDimensions();
  const height_percentual = height_percent ? height * height_percent : height * 0.15;
  const width__percentual = width_percent ? width * width_percent : width * 0.30;
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
    <View style={[{ padding: 0 }, styleView]} >
      <Animated.Image
        resizeMode='contain'
        source={{
          uri: item,
        }}
        onLoad={() => setIsImageLoaded(true)}
        style={[{
          marginTop: 0,
          opacity: fadeAnim,
          height: height_percentual,
          width: width__percentual
        }, styleImg]}
        onError={(e) => {
          e.nativeEvent.error;
        }}
      />
    </View>
  );
};

export default FadeInImage;
