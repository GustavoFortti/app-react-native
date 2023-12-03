import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { checkDatabaseStatus } from '../services/api/products';
import FadeText from '../components/FadeText';
import NetInfo from '@react-native-community/netinfo';

const Splash = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(true); // Estado para verificar a conexão de rede

  const checkNetworkStatus = async () => {
    try {
      const state = await NetInfo.fetch();
      return state.isConnected;
    } catch (error) {
      console.error('Erro ao verificar o status da rede:', error);
      return false; // Em caso de erro, considere a rede como indisponível
    }
  };

  useEffect(() => {
    const startSystem = async () => {
      try {
        // Verifique a conexão de rede
        const networkStatus = await checkNetworkStatus();
        setIsNetworkAvailable(networkStatus);

        if (networkStatus) {
          const status = await checkDatabaseStatus();
          if (status) {
            setTimeout(() => {
              navigation.replace('Home');
            }, 2000);
          } else {
            setIsLoading(false); // Define isLoading como falso se o status for falso
          }
        } else {
          setIsLoading(false); // Define isLoading como falso se a conexão de rede não estiver disponível
        }
      } catch (error) {
        console.error('Erro ao verificar o status do banco de dados:', error);
        setIsLoading(false); // Define isLoading como falso em caso de erro
      }
    };

    startSystem();
  }, [navigation]);


  return (
    <View style={styles.container}>
      {isLoading ? (
        <FadeText text={"NutriFind"} style={styles.text} />
      ) : (
        <>
          <></>
          {isNetworkAvailable ? (
            <FadeText text={"Estamos melhorando nosso app para você encontrar seus suplementos. \n\n : )"} style={styles.errorMessage} />
            ) : (
            <FadeText text={"Sem conexão com a internet. \n\n : | "} style={styles.errorMessage} />
          )}
        </>
      )}
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
  errorMessage: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'eurostile',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
});

export default Splash;
