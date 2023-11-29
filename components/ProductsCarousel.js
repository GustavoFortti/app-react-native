import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONTS, styles } from '../constants';

import ProductListHorizontal from '../components/ProductListHorizontal';

const ProductsCarousel = ({ products, navigation }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        width: '100%',
        marginLeft: 15,
        marginTop: 30,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          padding: 15,
          // borderTopWidth: 0.3,
          borderLeftWidth: 0.3,
          width: '60%',
        }}
      >
        <Text
          style={{
          ...FONTS.text_0,
          }}
        >
          Sabores de Whey
        </Text>
      </View>
      <ProductListHorizontal data={products} navigation={navigation} />
    </View>
  );
};

export default ProductsCarousel;
