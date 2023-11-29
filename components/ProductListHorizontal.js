import React from 'react';
import { FlatList, TouchableOpacity, View, Text, Image } from 'react-native';
import { COLORS } from '../constants';
import TruncatedText from '../components/TruncatedText';
import FadeInImagePrdctList from './FadeInImagePrdctList';

const ProductListHorizontal = ({ data, handleLoadMore, navigation, isLoading }) => {
  const renderProductItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          borderColor: COLORS.white,
          marginTop: 15,
          marginLeft: 5,
        }}
        onPress={() => navigation.navigate('Details', { productData: item })}
      >
        <FadeInImagePrdctList item={item.link_imagem} />
        <View
          style={{
            flexDirection: 'column',
            alignItems: "center",
            marginTop: 15,
            height: 55,
            width: 200,
          }}
        >
          <Text style={{ textAlign: 'center', lineHeight: 22 }}>
            <TruncatedText
              text={`${item.nome}`}
              maxLength={12}
              style={{
                fontSize: 22,
                color: COLORS.black,
                fontFamily: 'eurostile',
              }}
            />
            {' '}
            <TruncatedText
              text={`${item.marca}`}
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
            // borderBottomWidth: 0.2,
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
            R$ {item.preco}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <FlatList
          data={data}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          horizontal={true}
          key={`FlatList`}
          showsHorizontalScrollIndicator={false} 
        />
    </View>
  );
};

export default ProductListHorizontal;
