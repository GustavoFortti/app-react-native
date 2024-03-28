import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const Separator = ({ color = COLORS.grey_3, thickness = 0.3 }) => {
  return (
    <View style={[styles.separator, { borderBottomColor: color, borderBottomWidth: thickness }]} />
  );
};

const styles = StyleSheet.create({
  separator: {
    marginTop: 20,
  },
});

export default Separator;