import React from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, styles } from '../constants';

const CustomImageWithOverlay = ({ source, text, onButtonPress }) => {
  return (
    <View style={styles_container.container}>
      <ImageBackground
        source={{ uri: source }}
        style={styles_container.image}
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
      </ImageBackground>
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
