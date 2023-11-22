import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images } from '../constants'
import TruncatedText from '../components/TruncatedText';
import FadeInImageDetails from '../components/FadeInImageDetails';
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons"

const Details = ({ navigation, route }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { productData } = route.params;

  const openProductUrl = () => {
    if (productData.link_produto) {
      const url = productData.link_produto;
      Linking.openURL(url);
    }
  };
  
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <View style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <View style={{
          marginHorizontal: 22,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          width: SIZES.width - 44,
          top: 22,
          zIndex: 999
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
          >
            {
              isFavourite ? (
                <Ionicons
                  name="md-heart-sharp"
                  size={24}
                  color={COLORS.black}
                />
              ) : (
                <Ionicons
                  name="md-heart-outline"
                  size={24}
                  color={COLORS.black}
                />
              )
            }
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            flexDirection: 'column',
            alignItems: "center",
            width: "100%",
          }}
        >
          <FadeInImageDetails source={{ uri: productData.link_imagem }} />
          <View style={{
            backgroundColor: COLORS.white,
            borderRadius: 36,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: "center",
            paddingVertical: 20,
            paddingHorizontal: "5%",
            position: "absolute",
            width: "100%",
            bottom: 0
          }}>
            <View
              style={{
                marginTop: 10,
                backgroundColor: COLORS.white,
                height: "67%",
                width: "100%",
                paddingHorizontal: "3%",
                justifyContent: "center"
              }}
            >
              <TruncatedText
                text={`${productData.nome}`}
                maxLength={60}
                style={{
                  fontSize: 30,
                  lineHeight: 35,
                  color: COLORS.grey_hard,
                  fontFamily: 'eurostile',
                  letterSpacing: 10,
                  width: "100%",
                }}
              />
              <TruncatedText
                text={`${productData.marca}`}
                maxLength={28}
                style={{
                  marginTop: 15,
                  fontSize: 22,
                  letterSpacing: 6,
                  width: "100%",
                  color: COLORS.grey_title_sub,
                  fontFamily: 'eurostile',
                }}
              />
              <View style={{
                marginTop: "7%",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}>
                <View style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60%",
                  borderTopWidth: 0.3,
                  borderTopColor: COLORS.grey_title_low,
                }}>
                  <Text style={{
                    fontSize: 28,
                    marginTop: "10%",
                    color: COLORS.grey_hard,
                    fontFamily: 'eurostile',
                    letterSpacing: 6,
                  }}>R${productData.preco}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={openProductUrl}
            >
              <Feather
                name="shopping-bag"
                size={24}
                color={COLORS.white}
              />
              <Text style={{
                fontFamily: "eurostile",
                color: COLORS.white,
                fontSize: 20,
                marginLeft: 25,
                letterSpacing: 4,
              }}>Ir para o site</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "center",
    justifyContent: 'center',
    height: 44,
    width: "44",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12
  },
  selectedCheckbox: {
    backgroundColor: COLORS.black
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 12
  },
  button: {
    marginTop: 12,
    height: 60,
    width: SIZES.width - 44,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black
  }
})
export default Details