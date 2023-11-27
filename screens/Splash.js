import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    // Simule um tempo de carregamento (por exemplo, 2 segundos)
    setTimeout(() => {
      // Navegue para a próxima tela após o tempo de carregamento
      // Substitua 'MinhaTelaPrincipal' pelo nome da sua tela principal
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>NutriFind</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 64,
    fontWeight: '400',
    fontFamily: 'eurostile',
  },
});

export default Splash;
