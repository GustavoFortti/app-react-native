import React, { useState, useEffect, useRef } from 'react';

import {
  Animated,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, styles } from '../constants';

import H1 from '../components/text/H1';

import ProductsCarousel from '../components/ProductsCarousel';
import { searchByIndex } from '../services/api/products';
import CustomImageWithOverlay from '../components/CustomImageWithOverlay';
import Separator from '../components/body/Separator';
import BodyScroll from '../components/body/BodyScroll';

const NewHome = ({ navigation }) => {

  const [productsWhey, setProductsWhey] = useState([]);
  const [productsBarrinhas, setProductsBarrinhas] = useState([]);
  const [productsPreTreino, setProductsPreTreino] = useState([]);

  const [positionWhey, setPositionWhey] = useState(0);
  const [positionBarrinhas, setPositionBarrinhas] = useState(0);
  const [positionPreTreino, setPositionPreTreino] = useState(0);

  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const scrollAnim = useRef(new Animated.Value(0)).current;

  const CustomImageWithOverlayHeith = 500
  const ProductsCarouselHeith = 500
  const banner_1 = ProductsCarouselHeith * 1.12
  const banner_2 = (banner_1 + CustomImageWithOverlayHeith + ProductsCarouselHeith) * 1.05
  const banner_3 = (banner_2 + CustomImageWithOverlayHeith + ProductsCarouselHeith) * 1.03

  useEffect(() => {
    const listener = scrollAnim.addListener(({ value }) => {
      scrollViewRef.current?.scrollTo({ y: value, animated: false });
    });

    return () => {
      scrollAnim.removeListener(listener);
    };
  }, [scrollAnim]);

  useEffect(() => {
    const fetchProductsByIndex = async (index, setProducts) => {
      try {
        const data = await searchByIndex(index);
        const products = data.results
        setProducts(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProductsByIndex("6dfd37d8", setProductsWhey)
    fetchProductsByIndex("b5539dc2", setProductsBarrinhas)
    fetchProductsByIndex("97b10707", setProductsPreTreino)
  }, []);

  const onLayoutHandler = (event, position, setPosition) => {
    const { y } = event.nativeEvent.layout;
    setPosition(y + position);
  };

  const scrollToCarousel = (position) => {
    scrollAnim.setValue(currentScrollY.current);

    Animated.timing(scrollAnim, {
      toValue: position,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <BodyScroll
      headerZIndex={0}
      childrenHeader={
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "10%",
          }}
        >
          <H1 text="NutriFind" color={COLORS.black}/>
        </View>
      }
      childrenMain={
        <View>
          <CustomImageWithOverlay
            source={"https://raw.githubusercontent.com/GustavoFortti/dataindex-img/master/app/banner-1.webp"}
            text="Explore novos sabores e transforme sua nutrição com Whey Protein."
            onButtonPress={() => scrollToCarousel(positionWhey)}
          />
          <ProductsCarousel
            label="Whey protein"
            products={productsWhey}
            navigation={navigation}
            onLayout={event => onLayoutHandler(event, banner_1, setPositionWhey)}
          />
          <CustomImageWithOverlay
            source={"https://raw.githubusercontent.com/GustavoFortti/dataindex-img/master/app/banner-2.webp"}
            text="Ninguém deixa passar uma barrinha, especialmente quando é doce e cheia de proteína!"
            onButtonPress={() => (scrollToCarousel(positionBarrinhas))}
          />
          <ProductsCarousel
            label="Barrinhas"
            products={productsBarrinhas}
            navigation={navigation}
            onLayout={event => onLayoutHandler(event, banner_2, setPositionBarrinhas)}
          />
          <CustomImageWithOverlay
            source={"https://raw.githubusercontent.com/GustavoFortti/dataindex-img/master/app/banner-3.webp"}
            text="Descubra o segredo para disposição e foco inigualáveis no seu treino."
            onButtonPress={() => (scrollToCarousel(positionPreTreino))}
          />
          <ProductsCarousel
            label="Pré-treino"
            products={productsPreTreino}
            navigation={navigation}
            onLayout={event => onLayoutHandler(event, banner_3, setPositionPreTreino)}
          />
        </View>
      }
      scrollY={scrollY}
      setScrollY={setScrollY}
      scrollViewRef={scrollViewRef}
      currentScrollY={currentScrollY}
    />
  )
}

export default NewHome;
