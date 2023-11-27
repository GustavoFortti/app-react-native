import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, styles } from '../constants';

const ButtonSearch = ({ onPress }) => {
  return (
    <View style={{
      // position: 'relative',
      // width: "100%",
      // height: 100,
      // bottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <TouchableOpacity style={styles.button_black} onPress={onPress}>
        <Text style={styles.buttonText_black}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSearch;
