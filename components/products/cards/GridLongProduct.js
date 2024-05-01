import { View, FlatList, ScrollView } from 'react-native';
import React from 'react';
import LongProductCard from './LongProductCard';

const GridLongProduct = ({ products, navigation }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 10,
        left: "1%",
      }}
    >
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <LongProductCard
            item={item}
            navigation={""}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

export default GridLongProduct;
