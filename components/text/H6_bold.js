import React from 'react';
import { Text } from 'react-native';
import { COLORS } from '../../constants';

const H6_bold = ({ text, color, style }) => {
  return (
    <Text
      style={[{
        fontSize: 16,
        fontFamily: "orbitron_semibold",
        letterSpacing: 3,
        color: color,
      }, style]}
    >
      {text}
    </Text>
  );
}

export default H6_bold;
