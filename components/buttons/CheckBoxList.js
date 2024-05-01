import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CheckBox from './CheckBox';

const CheckBoxList = ({ options = [], selected = [], setSelected, style }) => {
  const toggleSelection = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const getButtonWidth = (text) => {
    const characterWidth = 8; // Approx width of one character
    const padding = 80; // Total horizontal padding
    return text.length * characterWidth + padding;
  };

  const renderOption = (option) => (
    <View key={option.value} style={{ width: getButtonWidth(option.label), margin: 5, marginRight: 15 }}>
      <CheckBox
        label={option.label}
        selected={selected.includes(String(option.value))}
        onPress={() => toggleSelection(String(option.value))}
        style={{
          borderRadius: 100,
          height: 34,
        }}
      />
    </View>
  );

  return (
    <View
      style={[{
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        alignItems: 'flex-start',
      }, style]}>
      {options.map(renderOption)}
    </View>
  );
};

export default CheckBoxList;
