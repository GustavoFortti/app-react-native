import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../constants';

const Separator = ({ color = COLORS.grey_3, thickness = 0.3, marginTop = 20 }) => {
  return (
    <View
      style={{
        borderBottomColor: color,
        borderBottomWidth: thickness,
        marginTop: marginTop
      }}
    />
  );
};

export default Separator;