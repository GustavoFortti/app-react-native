import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, styles } from '../constants';

import ProductListHorizontal from '../components/ProductListHorizontal';
import { searchByRef } from '../services/api/product';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]); // Estado para armazenar os resultados.

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await searchByRef("d064f0fe,2df7f8b8,02469fd7,5770e2e9,a60eeaf0");
        const products = data.results
        setProducts(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}>
      <View style={{
        alignItems: "center",
      }}>
        <View style={{
          marginTop: "3%",
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
              }}
            >
              NutriFind
            </Text>
          </View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "eurostile",
              color: COLORS.grey_title_mid,
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
            marginTop: 30,
          }}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50, paddingLeft: 15 }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                marginLeft: 30,
              }}
            >
              <Text
                style={FONTS.text_0}
              >
                Whey
              </Text>
            </View>
            <ProductListHorizontal
              data={products}
              navigation={navigation}
            />
            
           
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
