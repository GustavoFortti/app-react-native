import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, styles } from '../constants';

import ProductsCarousel from '../components/ProductsCarousel';
import { searchByIndex } from '../services/api/product';

const Home = ({ navigation }) => {
  const [productsWhey, setProductsWhey] = useState([]); // Estado para armazenar os resultados.
  const [productsBarrinhas, setProductsBarrinhas] = useState([]); // Estado para armazenar os resultados.
  const [productsPreTreino, setProductsPreTreino] = useState([]); // Estado para armazenar os resultados.

  useEffect(() => {
    const fetchProductsWhey = async () => {
      try {
        const data = await searchByIndex("whey");
        const products = data.results
        setProductsWhey(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    const fetchProductsBarrinhas = async () => {
      try {
        const data = await searchByIndex("barrinhas");
        const products = data.results
        setProductsBarrinhas(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    const fetchProductsPreTreino = async () => {
      try {
        const data = await searchByIndex("pretreino");
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

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.background,
    }}>
      <View style={{
        alignItems: "center",
      }}>
        <View style={{
          marginTop: "10%",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "50%",
          height: "12%",
        }}>
          <View
            style={{
              borderBottomWidth: 0.3,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontFamily: "orbitron_regular",
                letterSpacing: 4,
                marginBottom: "7%",
                color: COLORS.grey_6,
              }}
            >
              NutriFind
            </Text>
          </View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "eurostile",
              color: COLORS.grey_5,
              letterSpacing: 3,
            }}
          >
            Destaques
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            height: "74%",
            marginTop: 0,
          }}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50, paddingLeft: 15 }}
            style={{
              width: "100%",
              height: "100%",
              marginTop: 20,
            }}
          >
            <Image source={require("../assets/images/gym.png")} style={{ width: "110%", height: 200, marginLeft: -20 }} />
            <ProductsCarousel label="Sabores de whey" products={productsWhey} navigation={navigation} />
            <Image source={require("../assets/images/gym.png")} style={{ width: "110%", height: 200, marginLeft: -20 }} />
            <ProductsCarousel label="Barrinhas" products={productsBarrinhas} navigation={navigation} />
            <Image source={require("../assets/images/gym.png")} style={{ width: "110%", height: 200, marginLeft: -20 }} />
            <ProductsCarousel label="Pré-treino" products={productsPreTreino} navigation={navigation} />
          </ScrollView>
        </View>
        <View style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingVertical: "3%",
          // backgroundColor: COLORS.grey_0,
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
