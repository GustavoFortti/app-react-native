import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import H6 from '../text/H6';
import { COLORS } from '../../constants';

const RadioButton = ({ options = [], selected, setSelected, style }) => {
  return (
    <View
      style={[{
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
      }]}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[styles.option, style]}
          onPress={() => {setSelected(option.value)}}
        >
          <View style={[styles.circle, selected === option.value && styles.selectedCircle]} />
          <H6 text={option.label} style={styles.text} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  text: {
    fontSize: 16,
  },
});

export default RadioButton;
