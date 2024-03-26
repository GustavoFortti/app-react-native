import React from 'react';
import { Text } from 'react-native';
import { COLORS } from '../../constants';

const H2 = ({ text, color, style }) => {
  return (
    <Text
      style={[{
        fontSize: 24,
        fontFamily: "orbitron_regular",
        letterSpacing: 3,
        color: color,
      }, style]}
    >
      {text}
    </Text>
  );
}

export default H2;
