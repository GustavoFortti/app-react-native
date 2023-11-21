import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated } from 'react-native';

const FadeInImagePrdctList = ({ item }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isImageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // ajuste a duração da animação conforme necessário
        useNativeDriver: true, // use o driver nativo para melhor desempenho
      }).start();
    }
  }, [fadeAnim, isImageLoaded]);

  return (
    <View>
      <Animated.Image
        resizeMode='contain'
        source={{
          uri: item,
        }}
        onLoad={() => setIsImageLoaded(true)}
        style={{
          marginTop: 0,
          height: 170,
          width: 130,
          opacity: fadeAnim,
        }}
        onError={(e) => {
          e.nativeEvent.error;
        }}
      />
    </View>
  );
};

export default FadeInImagePrdctList;
