import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, images, styles } from '../constants';
import { findFavoriteProducts } from '../services/sqlite/Product';
import ProdutctList from '../components/ProdutctList';
import BannerImage from '../components/BannerImage';
import { findAllProducts } from '../services/firebase/product'

const Home = ({ navigation }) => {
  const [showBanner, setShowBanner] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const newElementTranslateY = useRef(new Animated.Value(0)).current;
  const [products, setProducts] = useState([]); // Estado para armazenar os resultados.

  useEffect(() => {
    // Chame a função findFavoriteProducts ou a função desejada para buscar os produtos.
    const fetchProducts = async () => {
      try {
        const results = await findAllProducts();
        setProducts(results); // Atualize o estado com os resultados.
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    // Chame a função para buscar os produtos.
    fetchProducts();
  }, []); // O array vazio [] garante que essa ação seja executada apenas uma vez quando o componente for montado.

  const handleSeeMorePress = () => {
    // Sequência de animações
    Animated.sequence([
      // 1. Inicia a animação para desaparecer gradualmente o ImageBackground
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
      // 2. Define showBanner como true
      Animated.timing(newElementTranslateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Quando a sequência de animações estiver completa, define showBanner como true

      setShowBanner(false);
    });

    // Inicia a animação para mudar a cor do texto de branco para preto
    Animated.timing(colorAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const handleTextPress = () => {
    // Sequência de animações
    Animated.sequence([
      // 1. Inicia a animação para mostrar gradualmente o ImageBackground
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      // 2. Inicia a animação para mover o novo elemento de cima para baixo
      Animated.timing(newElementTranslateY, {
        toValue: 300,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Quando a sequência de animações estiver completa, define showBanner como false
      // setShowBanner(true);
    });

    // Inicia a animação para mudar a cor do texto de preto para branco
    Animated.timing(colorAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const textColorInterpolation = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.white, 'black'],
  });

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}>
      <View style={{
        alignItems: "center",
      }}>
        <View style={{
          marginTop: "7%",
          flexDirection: "column",
          paddingBottom: "5%",
          borderBottomWidth: 0.2,
          width: "50%",
          alignItems: "center"
        }}>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "orbitron_regular",
              letterSpacing: 4,
            }}
          >
            NutriFind
          </Text>
        </View>
        <View style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "90%",
          width: "100%",
        }}>
          {/* {showBanner && <BannerImage navigation={navigation} handleSeeMorePress={handleSeeMorePress} fadeAnim={fadeAnim} />} */}
          <View style={{
          }}>
            <Text style={{
              fontSize: 22,
              fontFamily: "eurostile",
              color: COLORS.grey_title_mid,
              letterSpacing: 3,
            }}>Destaques</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              width: "100%",
              height: "76%",
            }}
          >
            {/* <ProdutctList
              data={products}
              numColumns={2}
              navigation={navigation}
            /> */}
          </View>
          <View style={{
          }}>
            <TouchableOpacity
              style={styles.button_black}
              onPress={() => navigation.navigate('Search')} // 'Search' deve ser o nome da tela de destino
            >
              <Text style={styles.buttonText_black}>Pesquisar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home;
