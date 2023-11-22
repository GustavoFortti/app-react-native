import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { COLORS } from '../constants';

const NoResultsModal = ({ visible, onClose, label }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();

      const timer = setTimeout(() => {
        onClose();
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  }, [visible, onClose, fadeAnim]);

  return (
    <Animated.View
      style={{
        bottom: "70%",
        left: '0%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeAnim, // Animação de opacidade aplicada aqui
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: '30%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
          activeOpacity={1}
          onPress={onClose}
        >
          <View
            style={{
              backgroundColor: COLORS.grey_6_t,
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 24, fontFamily: 'eurostile', color: COLORS.white }}>
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default NoResultsModal;
