import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { COLORS } from '../constants';

const FilterButton = ({ label, isActive, onPress, colorBack='white' }) => {
  const [style, setStyle] = useState({
    backgroundColor: isActive ? 'white' : colorBack,
  });

  useEffect(() => {
    if (isActive) {
      setStyle({
        backgroundColor: 'black',
      });
    } else {
      setTimeout(() => {
        setStyle({
          backgroundColor: colorBack,
        });
      }, 0);
    }
  }, [isActive]);

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        margin: -1,
        ...style, // Aplica os estilos dinamicamente
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '400',
          fontFamily: 'eurostile',
          color: isActive ? 'white' : 'black',
          padding: 10,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterButton;
