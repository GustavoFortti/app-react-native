import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../constants';

const Separator = ({ color = COLORS.grey_3, thickness = 0.3, marginTop = 20, style }) => {
  return (
    <View
      style={[{
        borderBottomColor: color,
        borderBottomWidth: thickness,
        width: "100%",
        marginTop: marginTop,
        height: 1
      }, style]}
    />
  );
};

export default Separator;