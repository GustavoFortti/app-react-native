import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  COLORS,
} from '../constants';
import ButtonSearch from './ButtonSearch';

const CustomDropdown = ({
  containerOption,
  searchResults,
  onPressArrowUp,
  staticData,
  renderCategoryItem,
  handleSearch,
}) => {
  return (
    <>
      { searchResults.length > 0 && (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 60, 
          }}
          onPress={() => onPressArrowUp('')}
        >
          <MaterialIcons
            name="keyboard-arrow-up"
            color={COLORS.grey_5}
            size={30}
          />
        </TouchableOpacity>
      )}
      <View style={{ height: searchResults.length === 0 ? "78%" : '70%', width: "105%" }}>
        <FlatList
          style={styles.flatList} // Certifique-se de definir seu estilo de FlatList
          data={staticData}
          renderItem={({ item, index }) => renderCategoryItem({ item, index }, containerOption)}
          keyExtractor={(item) => item.id.toString()}
          scrollIndicatorInsets={{ right: 1, backgroundColor: COLORS.grey_0 }}
        />
      </View>
      {containerOption && <ButtonSearch onPress={handleSearch} />}
    </>
  );
};

export const styles = StyleSheet.create({
  flatList: {
    marginTop: 18,
    height: '60%',
    width: "100%",
  },
});

export default CustomDropdown;
