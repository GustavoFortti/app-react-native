import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants';
import Separator from '../components/body/Separator';

const Products = ({ route, navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { searchData } = route.params;
  const [products, setProducts] = useState(searchData);

  console.log(products)

  return (
    <View style={styles.container}>
      {/* <FadeHeader
        scrollY={scrollY}
        style={styles.fadeHeader}
      >
      </FadeHeader> */}
      <Text>Products</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_0,
  },
  fadeHeader: {
    paddingTop: "15%",
    height: "18%",
    borderWidth: 0.3,
    borderBottomColor: COLORS.grey_3,
  },
  scrollView: {
    paddingTop: 30,
    flex: 1,
    paddingLeft: "6%",
    paddingRight: "6%",
  },
});

export default Products;
