import React from 'react';
import { Text } from 'react-native';
import { COLORS } from '../../constants';

const H3 = ({ text, color, style }) => {
  return (
    <Text
      style={[{
        fontSize: 22,
        fontFamily: "orbitron_regular",
        letterSpacing: 3,
        color: color,
      }, style]}
    >
      {text}
    </Text>
  );
}

export default H3;
