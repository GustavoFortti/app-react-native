import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants';
import IconButton from '../components/buttons/IconButton';
import ModalSort from '../components/products/modals/ModalSort';
import ModalFilter from '../components/products/modals/ModalFilter';
import filterData from '../components/products/filtersData';
import { searchByQuey } from '../services/api/products';
import Separator from '../components/body/Separator';
import BodyProducts from '../components/body/BodyProducts';

const Products = ({ route, navigation }) => {
  const [modal, setModal] = useState(false);

  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);
  const scrollY = useMemo(() => new Animated.Value(0), []);

  const { query, index } = route.params;
  const [execQuery, setExecQuery] = useState(query);
  const [execIndex, setExecIndex] = useState(index);
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (query !== execQuery || index !== execIndex) {
      setExecQuery(query);
      setExecIndex(index);
      setApplyQuery(true);
      setPage(1);
    }
  }, [query, index]);

  console.log(products.length);

  const fetchData = async () => {
    console.log("==================");
    console.log(!execQuery);
    console.log(!execIndex);
    console.log(!applyQuery);
    console.log(!isFetchingAllowed);
    console.log(fetchCount >= 3);
    console.log(loading);
    console.log((
      products.length != 0 &&
      products.length >= totalProducts
    ));
    console.log("==================");
    if (
      !execQuery ||
      !execIndex ||
      !applyQuery ||
      !isFetchingAllowed ||
      fetchCount >= 3 ||
      loading ||
      (
        products.length != 0 &&
        products.length >= totalProducts
      )
    ) {
      console.log("RETURN");
      return;
    }

    console.log("FLAG3");

    if (page === 1) {
      setProducts([])
      setTotalProducts([])
    }

    const sizePage = 30;
    setLoading(true);
    try {
      const data = await searchByQuey(
        execQuery,
        execIndex,
        page,
        sizePage,
        sortOption,
        filterOption,
        filterOptions,
      );

      if (page === 1) {
        setProducts(data.results);
      } else {
        setProducts(prevProducts => [...prevProducts, ...data.results]);
      }
      setTotalProducts(data.totalProducts);
      setApplyQuery(false);
      setFetchCount(prevCount => prevCount + 1);
      if (fetchCount === 2) {
        setIsFetchingAllowed(false);
        console.log('Too many requests');
      }
      console.log("++++++++++++++r");
      console.log(loading);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    execQuery,
    execIndex,
    applyQuery,
    isFetchingAllowed,
    fetchCount,
    page,
    sortOption,
    filterOption,
    filterOptions
  ]);

  const lastCallRef = useRef(Date.now());

  const handleEndPage = useCallback(() => {
    const now = Date.now();
    console.log("FLAG1");
    console.log(!loading);
    console.log(isFetchingAllowed);
    console.log((now - lastCallRef.current) > 3000);
    console.log("FLAG1");
    if (!loading && isFetchingAllowed && (now - lastCallRef.current) > 3000) {
      setPage(prevPage => prevPage + 1);
      console.log("FLAG2+");
      console.log(applyQuery);
      setApplyQuery(true);
      console.log(applyQuery);
      console.log("FLAG2-");
      lastCallRef.current = now;
      fetchData()
    }
  }, [loading, isFetchingAllowed, lastCallRef.current]);

  console.log(loading);

  return (
    <BodyProducts
      childrenHeader={
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "center",
              marginTop: "25%",
              width: '100%',
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
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={30} />
        </View>
      }
      data={products}
      scrollY={scrollY}
      scrollViewRef={scrollViewRef}
      currentScrollY={currentScrollY}
      childrenModal={modal}
      paddingTopScrollPercent={0.14}
      handleEndPage={handleEndPage}
      useFlatListToScroll={true}
      navigation={navigation}
      isFetchingMore={loading}
    />
  );
};

export default Products;