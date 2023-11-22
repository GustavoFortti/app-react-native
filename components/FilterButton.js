import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { COLORS } from '../constants';

const FilterButton = ({ label, isActive, onPress, colorBack='white', noActive=false, filterSelected=false }) => {

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        margin: -1,
        backgroundColor: (isActive ? 'black' : 
                          noActive && label !== 'Sabores' ? COLORS.grey_0 : 
                          'white'),
        borderColor: noActive ? COLORS.grey_0 : 'black',
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '400',
          fontFamily: 'eurostile',
          color: (isActive ? 'white' :
                  filterSelected && label === 'Ordenar' ? 'black' : 
                  noActive ? COLORS.grey_4 :
                 'black'),
          textDecorationLine: filterSelected && label === 'Ordenar' ? 'underline' : 'none',
          padding: 10,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterButton;
