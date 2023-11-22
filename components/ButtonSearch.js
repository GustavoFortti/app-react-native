import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, styles } from '../constants';

const ButtonSearch = ({ onPress }) => {
  return (
    <View style={{
      flex: 1,
      position: 'relative',
      width: "100%",
      bottom: '10%',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <View style={{ flex: 1, padding: 25 }}>
      </View>
      <TouchableOpacity style={styles.button_black} onPress={onPress}>
        <Text style={styles.buttonText_black}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonSearch;
