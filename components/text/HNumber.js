import React from 'react';
import { Text } from 'react-native';
import { COLORS } from '../../constants';

const HNumber = ({ text, color, style }) => {
  return (
    <Text
      style={[{
        fontSize: 14,
        fontFamily: "eurostyle",
        letterSpacing: 3,
        color: color,
      }, style]}
    >
      {text}
    </Text>
  );
}

export default HNumber;