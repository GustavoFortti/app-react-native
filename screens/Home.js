import React, { useState, useEffect, useRef } from 'react';

import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, styles } from '../constants';

import ProductsCarousel from '../components/ProductsCarousel';
import { searchByIndex } from '../services/api/products';
import CustomImageWithOverlay from '../components/CustomImageWithOverlay';

const Home = ({ navigation }) => {

  const [productsWhey, setProductsWhey] = useState([]); // Estado para armazenar os resultados.
  const [productsBarrinhas, setProductsBarrinhas] = useState([]); // Estado para armazenar os resultados.
  const [productsPreTreino, setProductsPreTreino] = useState([]); // Estado para armazenar os resultados.

  const [positionWhey, setPositionWhey] = useState(0);
  const [positionBarrinhas, setPositionBarrinhas] = useState(0);
  const [positionPreTreino, setPositionPreTreino] = useState(0);

  const [headerDisplay, setHeaderDisplay] = useState('flex');

  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollAnim = useRef(new Animated.Value(0)).current;

  const CustomImageWithOverlayHeith = 500
  const ProductsCarouselHeith = 500
  const banner_1 = ProductsCarouselHeith * 1.12
  const banner_2 = (banner_1 + CustomImageWithOverlayHeith + ProductsCarouselHeith) * 1.05
  const banner_3 = (banner_2 + CustomImageWithOverlayHeith + ProductsCarouselHeith) * 1.03

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    let timeoutId;
  
    const updateHeaderDisplay = ({ value }) => {
      clearTimeout(timeoutId);
      if (value === 0) {
        timeoutId = setTimeout(() => setHeaderDisplay('none'), 500);
      } else {
        setHeaderDisplay('flex');
      }
    };
  
    headerOpacity.addListener(updateHeaderDisplay);
  
    return () => {
      headerOpacity.removeListener(updateHeaderDisplay);
      clearTimeout(timeoutId);
    };
  }, [headerOpacity]);

  useEffect(() => {
    const listener = scrollAnim.addListener(({ value }) => {
      scrollViewRef.current?.scrollTo({ y: value, animated: false });
    });

    return () => {
      scrollAnim.removeListener(listener);
    };
  }, [scrollAnim]);

  useEffect(() => {
    const fetchProductsWhey = async () => {
      try {
        const data = await searchByIndex("6dfd37d8");
        const products = data.results
        setProductsWhey(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    const fetchProductsBarrinhas = async () => {
      try {
        const data = await searchByIndex("b5539dc2");
        const products = data.results
        setProductsBarrinhas(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    const fetchProductsPreTreino = async () => {
      try {
        const data = await searchByIndex("97b10707");
        const products = data.results
        setProductsPreTreino(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProductsWhey();
    fetchProductsBarrinhas();
    fetchProductsPreTreino();
  }, []);

  const onLayoutWhey = (event) => {
    const { y } = event.nativeEvent.layout;
    setPositionWhey(y + banner_1);
  };

  const onLayoutBarrinhas = (event) => {
    const { y } = event.nativeEvent.layout;
    setPositionBarrinhas(y + banner_2);
  };

  const onLayoutPreTreino = (event) => {
    const { y } = event.nativeEvent.layout;
    setPositionPreTreino(y + banner_3);
  };

  const scrollToCarousel = (position) => {
    // Definir o valor inicial da animação para a posição atual de rolagem
    scrollAnim.setValue(currentScrollY.current);

    Animated.timing(scrollAnim, {
      toValue: position,
      duration: 1000, // Duração da animação em milissegundos
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.background,
    }}>
      <View style={{
        alignItems: "center",
      }}>
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: COLORS.background,
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            height: "10%",
            opacity: headerOpacity,
            display: headerDisplay, 
          }}
        >
          <Text
            style={{
              marginTop: 45,
              fontSize: 26,
              fontFamily: "orbitron_regular",
              letterSpacing: 4,
              color: COLORS.grey_6,
            }}
          >
            NutriFind
          </Text>
        </Animated.View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "1%",
          }}
        >
          <Animated.ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ paddingBottom: 50, paddingLeft: 15 }}
            style={{
              width: "100%",
              height: "100%",
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: true,
                listener: event => {
                  if (scrollViewRef.current) {
                    currentScrollY.current = event.nativeEvent.contentOffset.y;
                  }
                }
              }
            )}
          >
            <View
              style={{
                width: "100%",
                height: "4%",
              }}
            >
            </View>
            <CustomImageWithOverlay
              source={"https://raw.githubusercontent.com/GustavoFortti/dataindex-img/master/app/banner-1.webp"}
              text="Explore novos sabores e transforme sua nutrição com Whey Protein."
              onButtonPress={() => scrollToCarousel(positionWhey)}
            />
            <ProductsCarousel
              label="Sabores de whey"
              products={productsWhey}
              navigation={navigation}
              onLayout={onLayoutWhey}
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
              onLayout={onLayoutBarrinhas}
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
              onLayout={onLayoutPreTreino}
            />
            <View
              style={{
                width: "100%",
                height: 250,
              }}
            >
            </View>
          </Animated.ScrollView>
        </View>

        <View style={{
          position: "absolute",
          alignItems: "center",
          paddingTop: 35,

          width: "100%",
          height: "20%",
          bottom: -20,
          borderTopWidth: 0.3,
          borderTopColor: COLORS.grey_3,
          backgroundColor: COLORS.background,

        }}>
          <TouchableOpacity
            style={{ ...styles.button_black_2 }}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.buttonText_black}>Pesquisar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home;
