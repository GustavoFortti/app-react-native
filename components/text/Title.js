import React from 'react';
import { Text } from 'react-native';
import { COLORS } from '../../constants';

const Title = ({ text }) => {
  return (
    <Text
      style={{
        marginTop: 45,
        fontSize: 26,
        fontFamily: "orbitron_regular",
        letterSpacing: 4,
        color: COLORS.grey_6,
      }}
    >
      {text}
    </Text>
  );
}

export default Title;
