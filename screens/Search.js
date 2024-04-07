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
import { searchByIndex, searchByQuey } from '../services/api/products';
import H1 from '../components/text/H1';
import BodyScroll from '../components/body/BodyScroll';

const Search = ({ navigation }) => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);
  const [searchText, setSearchText] = useState('');

  const handleSearchByIndex = async (index) => {
    try {
      console.log(index)
      const products = await searchByIndex("6dfd37d8");
      navigation.navigate('Products', { index: "6dfd37d8", query: false, data: products });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleSearchByQuery = async () => {
    try {
      const products = await searchByQuey(searchText);
      navigation.navigate('Products', { index: false, query: query, data: products });
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
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
              onSubmitEditing={() => handleSearchByQuery()}
              clearResults={() => setSearchText("")}
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
            onButtonPress={handleSearchByIndex}
          />
          <Separator color={COLORS.grey_3} thickness={0} marginTop={30} />
          <ImgScrollButton
            title="Massa Muscular"
            data={buttonData.muscle_mass}
            onButtonPress={handleSearchByIndex}
          />
          <ImgButton
            data={buttonData.protein_bar[0]}
            onButtonPress={handleSearchByIndex}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <SimpleButtonGrid
            title="Perfomance"
            data={buttonData.performance}
            onButtonPress={handleSearchByIndex}
            gridSize={4}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <ImgScrollButton
            title="Perda de peso"
            data={buttonData.weight_loss}
            onButtonPress={handleSearchByIndex}
          />
          <ImgButton
            data={buttonData.peanut_butter[0]}
            onButtonPress={handleSearchByIndex}
          />
          <ImgScrollButton
            title="Natural"
            data={buttonData.natural}
            onButtonPress={handleSearchByIndex}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <SimpleButtonGrid
            title="Saúde"
            data={buttonData.health}
            onButtonPress={handleSearchByIndex}
            gridSize={4}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <ImgButton
            data={buttonData.combos[0]}
            onButtonPress={handleSearchByIndex}
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

export default Search;