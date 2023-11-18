import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importe o ícone do AntDesign se necessário

const SortButton = ({ label, isActive, onPress, iconActive, sortOrder }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: isActive ? 'black' : 'white',
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 1.2,
        width: '27%',
        alignItems: 'center',
        marginHorizontal: 5,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: isActive ? 'white' : 'black',
          padding: 10,
          paddingLeft: iconActive ? 22 : 15,
        }}
      >
        {label}{' '}
        {iconActive && sortOrder === 'asc' && (
          <AntDesign name="down" size={8} color="white" />
        )}
        {iconActive && sortOrder === 'desc' && (
          <AntDesign name="up" size={8} color="white" />
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default SortButton;
