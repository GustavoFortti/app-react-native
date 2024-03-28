import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native'
import React, { useRef } from 'react';
import { COLORS } from '../constants';

import FadeHeader from '../components/body/FadeHeader';
import CustomSearchBar from '../components/search/CustomSearchBar';
import buttonData from '../components/search/searchData'
import Separator from '../components/body/Separator';
import SimpleButton from '../components/search/buttons/SimpleButton';
import ImgScrollButton from '../components/search/buttons/ImgScrollButton';
import SimpleGridButton from '../components/search/buttons/SimpleGridButton';
import ImgButton from '../components/search/buttons/ImgButton';

const ShelfSearch = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleButtonPress = (item) => {
    console.log("Botão pressionado:", item);
  };

  return (
    <View style={styles.container}>
      <FadeHeader
        scrollY={scrollY}
        style={styles.fadeHeader}
      >
        <CustomSearchBar
          placeholder="Buscar por suplementos..."
          onChangeText={(text) => console.log(text)}
          value=""
          onSubmitEditing={() => console.log("Pesquisa enviada")}
          clearResults={() => console.log("Resultados limpos")}
        />
      </FadeHeader>
      <ScrollView style={styles.scrollView}>
        <SimpleButton
          data={buttonData.promotion[0]}
          onButtonPress={handleButtonPress}
        />
        <Separator color={COLORS.grey_3} thickness={0} />
        <Separator color={COLORS.grey_3} thickness={0.3} />
        <ImgScrollButton
          title="Massa Muscular"
          data={buttonData.muscle_mass}
          onButtonPress={handleButtonPress}
        />
        <ImgButton
          data={buttonData.protein_bar[0]}
          onButtonPress={handleButtonPress}
        />
        <Separator color={COLORS.grey_3} thickness={0} />
        <Separator color={COLORS.grey_3} thickness={0.3} />
        <SimpleGridButton
          title="Perfomance"
          data={buttonData.performance}
          onButtonPress={handleButtonPress}
          gridSize={4}
        />
        <Separator color={COLORS.grey_3} thickness={0} />
        <Separator color={COLORS.grey_3} thickness={0.3} />
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
        <Separator color={COLORS.grey_3} thickness={0} />
        <Separator color={COLORS.grey_3} thickness={0.3} />
        <SimpleGridButton
          title="Saúde"
          data={buttonData.health}
          onButtonPress={handleButtonPress}
          gridSize={4}
        />
        <Separator color={COLORS.grey_3} thickness={0} />
        <Separator color={COLORS.grey_3} thickness={0.3} />
        <ImgButton
          data={buttonData.combos[0]}
          onButtonPress={handleButtonPress}
        />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
      
        
      </ScrollView>
    </View>
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

export default ShelfSearch;