import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { COLORS } from '../constants';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryItem = ({ 
  item, 
  onPress, 
  isSelected, 
  setSelectedItemOrdemMaxQnt, 
  setSelectedItemOrdemMinQnt,
  selectedItemOrdemMaxQnt,
  selectedItemOrdemMinQnt
}) => {
  const [selectedNumber, setSelectedNumber] = useState(-1);

  const options = [
    { label: "Selecione um valor", value: -1 },
    { label: "100g", value: 100 },
    { label: "250g", value: 250 },
    { label: "500g", value: 500 },
    { label: "800g", value: 800 },
    { label: "1Kg", value: 1000 },
    { label: "2Kg", value: 2000 },
  ];

  useEffect(() => {
    if (item.field === "max_qnt" && selectedItemOrdemMaxQnt != null) {
      setSelectedNumber(selectedItemOrdemMaxQnt - 1);
    } else if (item.field === "min_qnt" && selectedItemOrdemMinQnt != null) {
      setSelectedNumber(selectedItemOrdemMinQnt + 1);
    }
  }, [selectedItemOrdemMaxQnt, selectedItemOrdemMinQnt, item.field]);

  useEffect(() => {
    if (selectedNumber === null) {
      setSelectedNumber(-1)
    }
  }, [selectedNumber]);

  const onValueChange = (value) => {
    setSelectedNumber(value);

    if (item.field === "max_qnt") {
      setSelectedItemOrdemMaxQnt(value === -1 ? null : value + 1);
    } else if (item.field === "min_qnt") {
      setSelectedItemOrdemMinQnt(value === -1 ? null : value - 1);
    }
  };
  
  return (
    <>
      {item.field !== "min_qnt" && item.field !== "max_qnt" && item.field !== "quantidade_filter" ? (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: item.name !== "" ? 0.3 : 0,
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
              onValueChange={onValueChange}
              items={options}
              style={{
                inputIOS: {
                  fontSize: 22,
                  color: selectedNumber === -1 ? COLORS.grey_3 : COLORS.grey_6,
                  fontFamily: 'eurostile',
                  letterSpacing: 3,
                  paddingRight: 30,
                  textAlign: 'center',
                },
                inputAndroid: {
                  fontSize: 22,
                  color: selectedNumber === -1 ? COLORS.grey_3 : COLORS.grey_6,
                  fontFamily: 'eurostile',
                  letterSpacing: 3,
                  paddingRight: 30,
                  textAlign: 'center',
                },
                iconContainer: {
                  right: 5,
                },
              }}
              value={selectedNumber}
              useNativeAndroidPickerStyle={false}
              Icon={() => <Icon name="caret-down" size={20} color={selectedNumber === -1 ? COLORS.grey_3 : COLORS.grey_6} />}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default CategoryItem;
