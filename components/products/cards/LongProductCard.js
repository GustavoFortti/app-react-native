import React from 'react';
import { TouchableOpacity, View, Text, Linking } from 'react-native';
import { COLORS } from '../../../constants';
import TruncatedText from '../../text/TruncatedText';
import FadeInImage from '../../images/FadeInImage'
import SimpleButton from '../../buttons/SimpleButton';
import { Ionicons } from '@expo/vector-icons';
import Separator from '../../body/Separator';

const LongProductCard = ({ item, navigation }) => {

  const openProductUrl = () => {
    if (item.product_url) {
      const url = item.product_url;
      Linking.openURL(url);
    }
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
        height: 270,
        width: "98%",
        backgroundColor: COLORS.white,
        marginTop: 25,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: COLORS.grey_2,
        paddingTop: 10,

        // IOS
        shadowColor: COLORS.grey_6,
        shadowOffset: { width: 4, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        // Android
        elevation: 20,
        shadowColor: COLORS.grey_4,
      }}
      onPress={() => navigation.navigate('Details', { productData: item })}
    >
      <View
        style={{
          width: '100%',
          height: '60%',
          // backgroundColor: 'green'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
          }}
        >
          <View style={{ position: 'relative' }}>
            <FadeInImage
              item={item.image_url_srv}
              styleView={{
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
                paddingTop: 10,
                paddingLeft: 10,
              }}
            />
            {
              item.price_discount_percent != undefined &&
              item.price_discount_percent <= -0.05 &&
              <View style={{
                position: 'absolute',
                top: 0,
                left: 10,
                right: 0,
                bottom: 0,
                height: 50,
                width: 50,
                borderRadius: 100,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{ color: 'white' }}>
                  {`${(item.price_discount_percent * 100).toFixed(0)}%`}
                </Text>
              </View>
            }
          </View>
          <View
            style={{
              width: '65%',
              height: "100%",
              alignItems: 'flex-start',
              justifyContent: "flex-start",
              // backgroundColor: 'grey'
            }}
          >
            <View
              style={{
                // backgroundColor: 'red',
                paddingTop: 20,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: "flex-start",
                paddingLeft: 15,
                height: "65%",
                width: "96%"
              }}
            >
              <TruncatedText
                text={`${item.name}`}
                maxLength={40}
                style={{
                  fontSize: 20,
                  color: COLORS.grey_6,
                  fontFamily: 'eurostile',
                  // backgroundColor: 'grey',
                  width: "100%",

                }}
              />
              <TruncatedText
                text={`${item.brand}`}
                maxLength={20}
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  color: COLORS.grey_4,
                  fontFamily: 'eurostile',
                  textAlign: 'center',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderColor: COLORS.grey_6,
                // backgroundColor: "blue", S
                width: '100%',
                height: "35%",
                // height: 50

              }}
            >
              <Separator color={COLORS.grey_4} thickness={0.4} marginTop={0} style={{ width: "50%" }} />
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.grey_6,
                  fontFamily: 'eurostile',
                  letterSpacing: 3,
                  marginTop: 15
                }}
              >
                R$ {item.price}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: 'flex-start',
          paddingTop: 30,
          alignItems: "center",
          height: '40%',
          // backgroundColor: 'red'
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-evenly',
            height: '40%',
            marginBottom: 15,
            width: "100%"
          }}
        >
          <SimpleButton
            text={
              <Ionicons name="heart-outline" size={24} color={COLORS.grey_6} />
            }
            style={{
              height: 40,
              width: "45%",
              backgroundColor: COLORS.white
            }}
            colorText={COLORS.grey_6}
          />
          <SimpleButton
            onPress={openProductUrl}
            text="Ir para loja"
            style={{
              height: 40,
              width: "45%",
              backgroundColor: COLORS.grey_6
            }}
            colorText={COLORS.white}
          />
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default LongProductCard;
