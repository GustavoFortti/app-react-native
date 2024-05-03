import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS } from '../../../constants';
import TruncatedText from '../../text/TruncatedText';
import FadeInImage from '../../images/FadeInImage'
import SimpleButton from '../../buttons/SimpleButton';
import { health } from '../../search/searchData';

const LongProductCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
        height: 230,
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
          height: '65%'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <FadeInImage
            item={item.image_url_srv}
            styleView={{
              paddingTop: 10,
              paddingLeft: 10,
            }}
          />
          <View
            style={{
              width: '65%',
              height: "80%",
              alignItems: 'center',
              justifyContent: "space-between",
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                paddingLeft: 20,
                height: "60%",
                width: "100%"
              }}
            >
              <TruncatedText
                text={`${item.name}`}
                maxLength={30}
                style={{
                  fontSize: 22,
                  color: COLORS.grey_6,
                  fontFamily: 'eurostile',
                  textAlign: 'center',
                }}
              />
              <TruncatedText
                text={`${item.brand}`}
                maxLength={20}
                style={{
                  marginTop: 8,
                  fontSize: 20,
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
                justifyContent: 'center',
                borderColor: COLORS.grey_6,
                backgroundColor: COLORS.white,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.grey_6,
                  fontFamily: 'eurostile',
                  letterSpacing: 3,
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
          flexDirection: "row",
          justifyContent: 'space-around',
          alignItems: "center",
          height: '30%',
        }}      
      >
        <SimpleButton
          text="S2"
          style={{
            height: 35,
            width: "45%"
          }}
        />
        <SimpleButton
          text="loja"
          style={{
            height: 35,
            width: "45%"
          }}
        />
     
      </View>
    </TouchableOpacity>
  );
};

export default LongProductCard;
