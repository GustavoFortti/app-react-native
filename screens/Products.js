import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants';
import BodyScroll from '../components/body/BodyScroll';
import IconButton from '../components/buttons/IconButton';
import ModalSort from '../components/products/modals/ModalSort';
import ModalFilter from '../components/products/modals/ModalFilter';
import filterData from '../components/products/filtersData';
import GridLongProduct from '../components/products/cards/GridLongProduct';
import { searchByQuey } from '../services/api/products';
import Separator from '../components/body/Separator';
import Loading from '../components/Loading';

const Products = ({ route, navigation }) => {
  const [modal, setModal] = useState(false);

  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

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

  useEffect(() => {
    const fetchData = async () => {
      if (!execQuery || !execIndex || !applyQuery || !isFetchingAllowed || fetchCount >= 3 || loading) {
        return;
      }

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
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [execQuery, execIndex, applyQuery, isFetchingAllowed, fetchCount, page, sortOption, filterOption, filterOptions]);

  const lastCallRef = useRef(Date.now());

  const handleEndPage = () => {
    const now = Date.now();
    if (!loading && isFetchingAllowed && now - lastCallRef.current > 3000) {
      setPage(prevPage => prevPage + 1);
      setApplyQuery(true);
      lastCallRef.current = now;
    }
  };

  return (
    <BodyScroll
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
      childrenMain={
        <View
          style={{
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
          <Loading isActive={loading} />
        </View>
      }
      scrollY={scrollY}
      setScrollY={setScrollY}
      scrollViewRef={scrollViewRef}
      currentScrollY={currentScrollY}
      childrenModal={modal}
      paddingTopScrollPercent={0.20}
      handleEndPage={handleEndPage}
    />
  );
};

export default Products;