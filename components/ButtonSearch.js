import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

const ButtonSearch = ({onPress}) => {
  return (
    <View style={{ flex: 1, position: 'relative', width: "50%" }}>
      <View style={{ flex: 1, padding: 20 }}>
      </View>
      <TouchableOpacity style={bottomButtonStyle} onPress={onPress}>
        <Text style={buttonTextStyle}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

const bottomButtonStyle = {
  borderRadius: 0,
  position: 'absolute',
  bottom: 80,
  left: 0,
  right: 0,
  backgroundColor: 'black',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
};

const buttonTextStyle = {
  fontFamily: 'eurostile',
  color: '#fff',
  fontSize: 22,
};

export default ButtonSearch;
