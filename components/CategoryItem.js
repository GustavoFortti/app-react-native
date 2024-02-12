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
  selectedItemOrdemMaxQnt,
  setSelectedItemOrdemMinQnt,
  selectedItemOrdemMinQnt,
}) => {

  const [selectedNumber, setSelectedNumber] = useState(null);

  const options = [
    { label: "100g", value: "100" },
    { label: "250g", value: "250" },
    { label: "500g", value: "500" },
    { label: "800g", value: "800" },
    { label: "1Kg", value: "1000" },
    { label: "2Kg", value: "2000" },
  ];

  const calculateFilteredOptions = () => {
    if (item.field === "min_qnt") {
      return options.filter(option => {
        const optionValue = parseInt(option.value, 10);
        return selectedItemOrdemMaxQnt === null || optionValue < (parseInt(selectedItemOrdemMaxQnt, 10) - 1);
      });
    } else if (item.field === "max_qnt") {
      return options.filter(option => {
        const optionValue = parseInt(option.value, 10);
        return selectedItemOrdemMinQnt === null || optionValue > (parseInt(selectedItemOrdemMinQnt, 10) + 1);
      });
    }
  
    return options;
  };

  const [filteredOptions, setFilteredOptions] = useState(calculateFilteredOptions());

  useEffect(() => {
    setFilteredOptions(calculateFilteredOptions());
  }, [selectedItemOrdemMinQnt, selectedItemOrdemMaxQnt]);

  const onValueChange = (value) => {
    setSelectedNumber(value);
  
    if (item.field === "max_qnt") {
      const newValue = value ? parseInt(value, 10) + 1 : null;
      setSelectedItemOrdemMaxQnt(newValue);
    } else if (item.field === "min_qnt") {
      const newValue = value ? parseInt(value, 10) - 1 : null;
      setSelectedItemOrdemMinQnt(newValue);
    }
  
    calculateFilteredOptions();
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
              height: 50,
              width: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RNPickerSelect
              onValueChange={onValueChange}
              items={filteredOptions}
              style={{
                inputIOS: {
                  fontSize: 22,
                  fontFamily: 'eurostile',
                  color: selectedNumber ? COLORS.grey_6 : COLORS.grey_3,
                  letterSpacing: 3,
                  paddingRight: 30,
                  textAlign: 'center',
                },
                inputAndroid: {
                  fontSize: 22,
                  fontFamily: 'eurostile',
                  color: selectedNumber ? COLORS.grey_6 : COLORS.grey_3,
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
              placeholder={{ label: "Selecione um valor", value: null }}
              Icon={() => <Icon name="caret-down" size={20} color={selectedNumber ? COLORS.grey_6 : COLORS.grey_3} />}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default CategoryItem;
