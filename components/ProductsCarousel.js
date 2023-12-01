import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONTS, styles } from '../constants';

import ProductListHorizontal from '../components/ProductListHorizontal';

const ProductsCarousel = ({ label, products, navigation, onLayout }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        width: '100%',
        marginLeft: 15,
        marginBottom: 35,
        height: 500,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          padding: 15,
          // borderTopWidth: 0.3,
          borderLeftWidth: 0.3,
          width: '100%',
        }}
      >
        <Text
          onLayout={onLayout}
          style={{
          ...FONTS.text_0,
          }}
        >
          {label}
        </Text>
      </View>
      <ProductListHorizontal data={products} navigation={navigation}  />
    </View>
  );
};

export default ProductsCarousel;
