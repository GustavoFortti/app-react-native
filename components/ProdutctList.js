import React from 'react';
import { FlatList, TouchableOpacity, View, Text, Image } from 'react-native';
import { COLORS } from '../constants';
import TruncatedText from '../components/text/TruncatedText';
import FadeInImage from './FadeInImage';


const ProdutctList = ({ data, numColumns, handleLoadMore, navigation, isLoading }) => {
  const renderProductItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          borderColor: COLORS.white,
          borderWidth: 1,
          borderRadius: 14,
          marginTop: 30,
          width: "48%",
          marginHorizontal: 2,
          justifyContent: 'flex-start',
          
        }}
        onPress={() => navigation.navigate('Details', { productData: item })}
      >
        <FadeInImagePrdctList item={item.image_url_srv} />
        <View
          style={{
            flexDirection: 'column',
            borderRadius: 22,
            backgroundColor: COLORS.white,
            paddingHorizontal: 15,
            alignItems: "center",
            width: "100%",
            marginTop: 15,
            height: 65,
          }}
        >
          <Text style={{ textAlign: 'center', lineHeight: 22 }}>
            <TruncatedText
              text={`${item.name}`}
              maxLength={12}
              style={{
                fontSize: 22,
                color: COLORS.black,
                fontFamily: 'eurostile',
              }}
            />
          </Text>
          <Text style={{ textAlign: 'center', lineHeight: 22 }}>
            <TruncatedText
              text={`${item.brand}`}
              maxLength={12}
              style={{
                marginTop: 6,
                fontSize: 20,
                color: COLORS.grey_title_sub,
                fontFamily: 'eurostile',
              }}
            />
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
            paddingBottom: 10,
            borderBottomWidth: 0.2,
            width: "80%",
            borderColor: COLORS.black,
            backgroundColor: COLORS.white,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: COLORS.black,
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

  return (
    <View style={{ flex: 1 }}>
        <FlatList
          numColumns={numColumns}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          style={{ marginTop: 10, height: '100%', width: '100%' }}
          data={data}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          key={`FlatList-${numColumns}`}
        />
    </View>
  );
};

export default ProdutctList;
