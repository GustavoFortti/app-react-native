import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native'
import React, { useRef } from 'react';
import { COLORS } from '../constants';

import FadeHeader from '../components/body/FadeHeader';
import CustomSearchBar from '../components/search/CustomSearchBar';
import SearchImgScrollButtonBar from '../components/search/buttons/SearchImgScrollButtonBar';
import SearchBannerButtonBar from '../components/search/buttons/SearchBannerButtonBar';
import buttonData, { buttonStyles } from '../components/search/searchData'
import Separator from '../components/body/Separator';
import SearchBannerImgButtonBar from '../components/search/buttons/SearchBannerImgButtonBar';
import BannerButtonStyleGradient from '../components/search/buttons/BannerButtonStyleGradient';


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
        <BannerButtonStyleGradient
          data={buttonData.promotion[0]}
          onButtonPress={handleButtonPress}
          buttonStyle={buttonStyles.BannerButtonStyleGradient}
        />
        <BannerButtonStyleGradient
          data={buttonData.whey[0]}
          onButtonPress={handleButtonPress}
          buttonStyle={buttonStyles.BannerButtonStyleGradient}
        />
        <BannerButtonStyleGradient
          data={buttonData.protein_bar[0]}
          onButtonPress={handleButtonPress}
          buttonStyle={buttonStyles.BannerButtonStyleGradient}
        />
        <Separator color={COLORS.grey_3} thickness={0.3} />
        <SearchImgScrollButtonBar
          title="Massa Muscular"
          data={buttonData.muscle_mass}
          onButtonPress={handleButtonPress}
          buttonStyle={buttonStyles.ImgSmallButtonStyle}
        />
        <Separator color={COLORS.grey_3} thickness={0.3} />
        <SearchImgScrollButtonBar
          title="Energia e foco"
          data={buttonData.energy_and_focus}
          onButtonPress={handleButtonPress}
          buttonStyle={buttonStyles.ImgSmallButtonStyle}
        />
        <Separator color={COLORS.grey_3} thickness={0.3} />
        
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <Separator color={COLORS.grey_3} thickness={0.1} />
        <SearchBannerButtonBar
          data={buttonData.peanut_butter[0]}
          onButtonPress={handleButtonPress}
          buttonStyle={buttonStyles.BannerButtonStyleWhite}
        />
        <Separator color={COLORS.grey_3} thickness={0.5} />
        <SearchBannerImgButtonBar
          data={buttonData.peanut_butter[0]}
          onButtonPress={handleButtonPress}
          buttonStyle={buttonStyles.ImgBigButtonStyle}
        />
        <BannerButtonStyleGradient
          data={buttonData.peanut_butter[0]}
          onButtonPress={handleButtonPress}
          buttonStyle={buttonStyles.BannerButtonStyleGradient}
        />
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
    flex: 1,
    paddingLeft: "6%",
    paddingRight: "6%",
  },
});

export default ShelfSearch;