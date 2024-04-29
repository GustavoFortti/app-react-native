import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants';
import BodyScroll from '../components/body/BodyScroll';
import IconButton from '../components/buttons/IconButton';
import ModalSort from '../components/products/modals/ModalSort';
import ModalFilter from '../components/products/modals/ModalFilter';
import filterData from '../components/products/filtersData';
import GridLongProduct from '../components/products/cards/GridLongProduct'
import { searchByQuey } from '../services/api/products';

const Products = ({ route, navigation }) => {
  const [modal, setModal] = useState(false);
  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { query, index } = route.params;

  const sortOptions = filterData.sort;
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  const filterOptions = {
    rangePrice: filterData.rangePrice,
    rangeQnt: filterData.rangeQnt,
    brand: filterData.brand,
  };

  const [filterOption, setFilterOption] = useState({
    rangePrice: null,
    rangeQnt: null,
    brand: [],
  });

  const [applyQuery, setApplyQuery] = useState(true);
  const [fetchCount, setFetchCount] = useState(0);
  const [isFetchingAllowed, setIsFetchingAllowed] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFetchCount(0);
      setIsFetchingAllowed(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!applyQuery || !isFetchingAllowed || fetchCount >= 3) {
          return;
        }

        const sizePage = 30;
        const page = 1;

        const data = await searchByQuey(
          query,
          index,
          page,
          sizePage,
          sortOption,
          filterOption,
          filterOptions,
        );

        setTotalProducts(data.totalProducts)
        setProducts(data.results);
        setLoading(false);
        setApplyQuery(false);
        setFetchCount(prevCount => prevCount + 1);
        if (fetchCount === 2) {
          setIsFetchingAllowed(false);
          console.log('To many requests');
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [applyQuery, fetchCount, isFetchingAllowed]);

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
                sortOption={sortOption}
                setApplyQuery={setApplyQuery}
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
                filterOptions={filterOptions}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                setApplyQuery={setApplyQuery}
              />
            )}
          />
        </View>
      }
      childrenMain={
        <View
          style={{
            backgroundColor: COLORS.grey_0,
            width: "100%",
            alignItems: "center"
          }}
        >
          {
            products &&
            <GridLongProduct
              products={products}
              navigation={navigation}
            />
          }
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
