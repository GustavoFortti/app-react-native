import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants';
import BodyScroll from '../components/body/BodyScroll';
import IconButton from '../components/buttons/IconButton';
import ModalSort from '../components/products/modals/ModalSort';
import ModalFilter from '../components/products/modals/ModalFilter';
import filterData from '../components/products/filtersData';

const Products = ({ route, navigation }) => {
  const [modal, setModal] = useState(false);
  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const { query, index, data } = route.params;
  console.log("query")
  console.log(query)
  console.log("index")
  console.log(index)
  
  // const [products, setProducts] = useState(searchData);
  const [sortOption, setSortOption] = useState('0');
  const [filterOption, setFilterOption] = useState('');
  
  const sortOptions = filterData.sortOptions;

  return (
    <BodyScroll
      childrenHeader={
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
            height: "100%",
            width: "100%",
            paddingBottom: "10%",
            // backgroundColor: "grey"
          }}
        >
          <IconButton
            iconName={"sort-variant"}
            text={"Ordenar"}
            onPress={() => setModal(
              <ModalSort
                modalVisible={true}
                setModalVisible={setModal}
                setSortOption={setSortOption}
                sortOptions={sortOptions}
              />
              )}
          />
          <IconButton
            iconName={"filter"}
            text={"Filtrar"}
            onPress={() => setModal(
              <ModalFilter
                modalVisible={true}
                setModalVisible={setModal}
                setSortOption={setFilterOption}
              />
            )}
          />
        </View>
      }
      childrenMain={
        <View
          style={{
            backgroundColor: COLORS.grey_0
          }}
        >
          <Text>inicio</Text>
        </View>
      }
      scrollY={scrollY}
      setScrollY={setScrollY}
      scrollViewRef={scrollViewRef}
      currentScrollY={currentScrollY}
      childrenModal={modal}
    />
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
