import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { COLORS } from '../constants';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryItem = ({ item, onPress, isSelected, setSelectedItemOrdemMaxQnt, setSelectedItemOrdemMinQnt }) => {
  const [selectedNumber, setSelectedNumber] = useState("Todos");

  const numbers = ["Todos", "100g", "250g", "500g", "800g", "1Kg", "2Kg"];

  return (
    <>
      {item.field !== "min_qnt" && item.field !== "max_qnt" && item.field !== "quantidade_filter" ? (
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
        </TouchableOpacity>
      ) : item.field === "quantidade_filter" ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: "100%",
            borderBottomWidth: 0
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: COLORS.grey_3,
              fontFamily: 'eurostile',
              margin: 20,
              letterSpacing: 3,
            }}
          >
            {item.name}
          </Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: item.field === "max_qnt" ? 0.3 : 0,
            width: "100%",
            height: 60,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: isSelected ? COLORS.grey_6 : COLORS.grey_3,
              fontFamily: 'eurostile',
              margin: 20,
              letterSpacing: 3,
            }}
          >{item.name}</Text>
          <View
            style={{
              marginLeft: 0,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RNPickerSelect
              onValueChange={(value) => {
                setSelectedNumber(value);
                if (item.field === "max_qnt") {
                  setSelectedItemOrdemMaxQnt(value);
                } else if (item.field === "min_qnt") {
                  setSelectedItemOrdemMinQnt(value);
                }
              }}
              items={numbers.map((number) => ({ label: number, value: number }))}
              style={{
                inputIOS: {
                  fontSize: 22,
                  color: COLORS.grey_6,
                  fontFamily: 'eurostile',
                  letterSpacing: 3,
                  paddingRight: 30, // para garantir que o texto não seja cortado
                  textAlign: 'center', // Centralizar o texto dentro do RNPickerSelect
                },
                inputAndroid: {
                  fontSize: 22,
                  color: COLORS.grey_6,
                  fontFamily: 'eurostile',
                  letterSpacing: 3,
                  paddingRight: 30, // para garantir que o texto não seja cortado
                  textAlign: 'center', // Centralizar o texto dentro do RNPickerSelect
                },
                iconContainer: {
                  right: 5,
                },
              }}
              value={selectedNumber}
              useNativeAndroidPickerStyle={false}
              Icon={() => <Icon name="caret-down" size={20} color={COLORS.grey_6} />}
            />
            
          </View>
          
        </View>

      )}
    </>
  );
};

export default CategoryItem;
