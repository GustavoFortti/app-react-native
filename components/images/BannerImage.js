import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, images, styles } from '../constants';
import { Animated } from 'react-native';

const BannerImage = ({ navigation, handleSeeMorePress, fadeAnim }) => {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: "-10%",
        right: "-10%",
        bottom: 0,
        zIndex: 2,
      }}
    >
      <ImageBackground
        source={images.banner}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(255,255,255,1)', 'transparent']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={{
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              height: "40%",
            }}
          >
            <Text style={{
              color: COLORS.grey_back_low,
              fontSize: 36,
              fontFamily: "eurostile",
              letterSpacing: 6,
            }}>
              NutriFind
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.buttonText}>Pesquisar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSeeMorePress}
          >
            <Text style={styles.buttonText}>Veja mais</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default BannerImage;
