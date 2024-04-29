import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS } from '../../../constants';
import TruncatedText from '../../text/TruncatedText';
import FadeInImage from '../../images/FadeInImage'

const LongProductCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
        height: 350,
        width: "98%",
        backgroundColor: COLORS.white,
        marginTop: 15,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: COLORS.grey_2,

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
      <FadeInImage item={item.image_url_srv} />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 0,
          height: 100,
          width: '100%',
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
          paddingBottom: 10,
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
    </TouchableOpacity>
  );
};

export default LongProductCard;
