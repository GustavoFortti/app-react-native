import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native'
import React, { useRef } from 'react';
import { COLORS } from '../constants';

import FadeHeader from '../components/body/FadeHeader';
import CustomSearchBar from '../components/search/CustomSearchBar';
import buttonData from '../components/search/searchData'
import Separator from '../components/body/Separator';
import SimpleButton from '../components/search/buttons/SimpleButton';
import ImgScrollButton from '../components/search/buttons/ImgScrollButton';
import SimpleButtonGrid from '../components/search/buttons/SimpleButtonGrid';
import ImgButton from '../components/search/buttons/ImgButton';
import { searchByIndex } from '../services/api/products';
import H1 from '../components/text/H1';
import BodyScroll from '../components/body/BodyScroll';

const NewSearch = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);

  const handleButtonPress = async (index) => {
    try {
      // const products = await searchByIndex("6dfd37d8");
      navigation.navigate('Products', { searchData: [] });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  return (
    <BodyScroll
      headerZIndex={1}
      childrenHeader={
        <View>
          <View
            style={{
              paddingHorizontal: "3%",
            }}
          >
            <CustomSearchBar
              placeholder="Buscar por suplementos..."
              onChangeText={(text) => console.log(text)}
              value=""
              onSubmitEditing={() => console.log("Pesquisa enviada")}
              clearResults={() => console.log("Resultados limpos")}
            />
          </View>
          <Separator color={COLORS.grey_3} thickness={0.9} marginTop={10} />
        </View>
      }
      childrenMain={
        <View
          style={{
            paddingHorizontal: "5%",
            paddingTop: 30
          }}
        >
          <SimpleButton
            data={buttonData.promotion[0]}
            onButtonPress={handleButtonPress}
          />
          <Separator color={COLORS.grey_3} thickness={0} marginTop={30} />
          <ImgScrollButton
            title="Massa Muscular"
            data={buttonData.muscle_mass}
            onButtonPress={handleButtonPress}
          />
          <ImgButton
            data={buttonData.protein_bar[0]}
            onButtonPress={handleButtonPress}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <SimpleButtonGrid
            title="Perfomance"
            data={buttonData.performance}
            onButtonPress={handleButtonPress}
            gridSize={4}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <ImgScrollButton
            title="Perda de peso"
            data={buttonData.weight_loss}
            onButtonPress={handleButtonPress}
          />
          <ImgButton
            data={buttonData.peanut_butter[0]}
            onButtonPress={handleButtonPress}
          />
          <ImgScrollButton
            title="Natural"
            data={buttonData.veg}
            onButtonPress={handleButtonPress}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <SimpleButtonGrid
            title="Saúde"
            data={buttonData.health}
            onButtonPress={handleButtonPress}
            gridSize={4}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <ImgButton
            data={buttonData.combos[0]}
            onButtonPress={handleButtonPress}
          />
        </View>
      }
      scrollY={scrollY}
      scrollViewRef={scrollViewRef}
      currentScrollY={currentScrollY}
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

export default NewSearch;