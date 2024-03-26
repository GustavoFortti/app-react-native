import React from 'react';
import { SearchBar } from 'react-native-elements';
import { COLORS } from '../../constants';  // Importe suas cores aqui

const CustomSearchBar = ({ 
  placeholder, 
  onChangeText, 
  value, 
  onSubmitEditing, 
  clearResults 
}) => {
  return (
    <SearchBar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      lightTheme
      containerStyle={{
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
      }}
      inputContainerStyle={{
        backgroundColor: COLORS.grey_0,
        width: "90%",
        borderRadius: 3,
      }}
      inputStyle={{
        color: 'rgba(0, 0, 0, 0.7)',
      }}
      onSubmitEditing={onSubmitEditing}
      searchIcon={{
        size: 24,
        containerStyle: { marginRight: 5, marginLeft: 10 },
      }}
      clearIcon={{
        size: 28,
        onPress: clearResults,
      }}
    />
  );
}

export default CustomSearchBar;
