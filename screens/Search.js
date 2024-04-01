import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react';
import { COLORS } from '../constants';

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

const Search = ({ navigation }) => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);

  const handleButtonPress = async (index) => {
    try {
      console.log(index)
      // const products = await searchByIndex("6dfd37d8");
      navigation.navigate('Products', { searchData: [] });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  return (
    <BodyScroll
      childrenHeader={
        <View>
          <View
            style={{
              height: "100%",
              width: "100%",
              // alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: "5%",
              paddingHorizontal: "3%",
              // backgroundColor: "red"
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
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={0} />
        </View>
      }
      childrenMain={
        <View
          style={{
            paddingHorizontal: "5%",
            // paddingTop: 10
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
      setScrollY={setScrollY}
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

export default Search;