import { View, Text, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../constants';
import FadeHeader from '../components/body/FadeHeader';
import CustomSearchBar from '../components/search/CustomSearchBar';


const ShelfSearch = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <FadeHeader
        scrollY={scrollY}
        style={{
          paddingTop: "15%",
          height: "42%",
          backgroundColor: COLORS.background_0,
        }}
      >
        <CustomSearchBar
          placeholder="Buscar por suplementos..."
          onChangeText={(text) => console.log(text)} // Apenas para mostrar o texto digitado no console
          value="Texto de exemplo" // Valor fictício para o campo de pesquisa
          onSubmitEditing={() => console.log("Pesquisa enviada")} // Apenas para exibir uma mensagem no console quando a pesquisa for enviada
          clearResults={() => console.log("Resultados limpos")} // Apenas para exibir uma mensagem no console quando os resultados forem limpos
        />
      </FadeHeader>
    </View>
  )
}

export default ShelfSearch;