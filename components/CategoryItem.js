import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { COLORS } from '../constants';

const CategoryItem = ({ item, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.3,
        width: "100%",
        borderColor: isSelected ? COLORS.grey_6 : COLORS.grey_4,
      }}
      onPress={() => onPress(item.name)}
    >
      <View>
        <View>
          <Text
            style={{
              fontSize: 22,
              color: isSelected ? COLORS.grey_6 : COLORS.grey_3,
              fontFamily: 'eurostile',
              margin: 20,
              letterSpacing: 3,
            }}
          >
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;
