import React from 'react';
import { Text } from 'react-native';
import { COLORS } from '../../constants';

const H1 = ({ text, color, style }) => {
  return (
    <Text
      style={[{
        fontSize: 26,
        fontFamily: "orbitron_regular",
        letterSpacing: 4,
        color: color,
      }, style]}
    >
      {text}
    </Text>
  );
}

export default H1;
