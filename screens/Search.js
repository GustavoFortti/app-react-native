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
import BodyScroll from '../components/body/BodyScroll';

const Search = ({ navigation }) => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const scrollViewRef = useRef(null);
  const currentScrollY = useRef(0);
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (data) => {
    try {
      let index = buttonData.allData;
      if (data.index) {
        index = data.index
      }
      navigation.navigate('Products', { index, query: data.search });
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
              onSubmitEditing={() => handleSearch({index: false, search: searchText})}
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
            onButtonPress={handleSearch}
          />
          <Separator color={COLORS.grey_3} thickness={0} marginTop={30} />
          <ImgScrollButton
            title="Massa Muscular"
            data={buttonData.muscleMass}
            onButtonPress={handleSearch}
          />
          <ImgButton
            data={buttonData.proteinBar[0]}
            onButtonPress={handleSearch}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <SimpleButtonGrid
            title="Perfomance"
            data={buttonData.performance}
            onButtonPress={handleSearch}
            gridSize={4}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <ImgScrollButton
            title="Perda de peso"
            data={buttonData.weightLoss}
            onButtonPress={handleSearch}
          />
          <ImgButton
            data={buttonData.peanutButter[0]}
            onButtonPress={handleSearch}
          />
          <ImgScrollButton
            title="Natural"
            data={buttonData.natural}
            onButtonPress={handleSearch}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <SimpleButtonGrid
            title="Saúde"
            data={buttonData.health}
            onButtonPress={handleSearch}
            gridSize={4}
          />
          <Separator color={COLORS.grey_3} thickness={0.3} marginTop={40} />
          <ImgButton
            data={buttonData.combos[0]}
            onButtonPress={handleSearch}
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