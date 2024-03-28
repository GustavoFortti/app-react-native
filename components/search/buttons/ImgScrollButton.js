import React from 'react';
import { FlatList, View, Text } from 'react-native';
import FadeInImageButton from '../../buttons/FadeInImageButton';
import { COLORS } from '../../../constants';
import { Svg, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import H4 from '../../text/H4';
import H6_bold from '../../text/H6_bold';

const ImgScrollButton = ({ title, data, onButtonPress }) => {
  const startColor = COLORS.white;
  const middleColor = COLORS.white;
  const endColor = COLORS.grey_0_t;


  const renderButton = ({ item }) => (
    <View
      style={{
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        // IOS
        shadowColor: COLORS.grey_1,
        shadowOffset: { width: -1, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        
        // // android
        elevation: 20,
        shadowColor: COLORS.grey_4,
        
      }}
      >
      <FadeInImageButton
        imageUrl={item.imageUrl}
        imageStyle={{
          height: 110,
          width: 210,
          borderRadius: 5,
          backgroundColor: COLORS.white_t_30,
          
        }}
        source={{ uri: item.imageUrl }}
        onButtonPress={onButtonPress}
        buttonName={item.search}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              height: "45%",
              width: "100%",
              backgroundColor: COLORS.grey_0,
              justifyContent: 'center',
            }}
          >
            <View style={{ position: 'relative' }}>
              <View style={{ position: 'absolute', zIndex: 0, width: '100%', height: '100%' }}>
                <Svg height="100%" width="100%">
                  <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                      <Stop offset="0" stopColor={startColor} stopOpacity="1" />
                      <Stop offset="0.5" stopColor={middleColor} stopOpacity="1" />
                      <Stop offset="1" stopColor={endColor} stopOpacity="1" />
                    </LinearGradient>
                  </Defs>
                  <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                </Svg>
              </View>
              <View
                style={{
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  paddingLeft: 15,
                  paddingTop: 15
                }}>
                <H6_bold text={item.search} color={COLORS.grey_6_t} />
              </View>
            </View>
          </View>
        </View>
      </FadeInImageButton>
    </View>
  );

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <H4 text={title} color={COLORS.grey_6} style={{ marginTop: 30 }} />
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <FlatList
          data={data}
          renderItem={renderButton}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 0 }}
        />
      </View>
    </View>
  );
};

export default ImgScrollButton;
