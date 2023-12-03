import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { COLORS, FONTS, styles } from '../constants';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const CustomImageWithOverlay = ({ source, text, onButtonPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles_container.container}>
      <AnimatedImageBackground
        source={{ uri: source }} // Verifique se a propriedade 'source' está recebendo a URI correta
        style={[styles_container.image, { opacity: fadeAnim }]}
      >
        <View style={styles_container.overlay}>
          <Text style={styles_container.text}>{text}</Text>
          <TouchableOpacity
            onPress={onButtonPress}
            style={{ ...styles.button_trasparent, marginTop: 50 }}
          >
            <Text style={styles.buttonText_white}>Veja mais</Text>
          </TouchableOpacity>
        </View>
      </AnimatedImageBackground>
    </View>
  );
};

const styles_container = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: "110%",
    height: 500,
    marginLeft: -20,
    marginBottom: 40,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  text: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'eurostile',
  },
});

export default CustomImageWithOverlay;
