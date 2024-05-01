import { View, Text, StyleSheet, Animated, useWindowDimensions, ScrollView, Keyboard, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalBottom from '../../body/ModalBottom';
import { COLORS } from '../../../constants';
import IconButton from '../../buttons/IconButton';
import CheckBoxList from '../../buttons/CheckBoxList';
import Separator from '../../body/Separator';
import ModalApply from './ModalApply';
import RangeSlider from '../../buttons/RangeSlider';
import H6 from '../../text/H6';

const ModalFilter = ({
  modalVisible,
  setModalVisible,
  filterOptions,
  filterOption,
  setFilterOption,
  setApplyQuery
}) => {
  const { height } = useWindowDimensions();
  const height_15 = height * 0.15;
  const height_80 = height * 0.80;
  const height_modal = Math.min(height_15 + 600, height_80)

  const [brand, setBrand] = useState(filterOption.brand.map((item) => item.value));
  const [rangePrice, setRangePrice] = useState(filterOptions.rangePrice);
  const [rangeQnt, setRangeQnt] = useState(filterOptions.rangeQnt);

  useEffect(() => {
    const brandSelected = (brand && brand.length > 0 ? filterOptions.brand.filter((item) => brand.includes(item.value)) : [])

    const rangePriceSelected = (
      filterOptions.rangePrice.max === rangePrice.max &&
      filterOptions.rangePrice.min === rangePrice.min
    ) ? null : rangePrice
    
    const rangeQntSelected = (
      filterOptions.rangeQnt.min === rangeQnt.min &&
      filterOptions.rangeQnt.max === rangeQnt.max
    ) ? null : rangeQnt

    setFilterOption({
      rangePrice: rangePriceSelected,
      rangeQnt: rangeQntSelected,
      brand: brandSelected,
    })
  }, [brand, rangePrice, rangeQnt])

  const [animation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [height_modal, 0],
  });

  const handleCloseModal = (cancel) => {
    if (cancel) {
    } else {
      setApplyQuery(true)
    }
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <ModalBottom
      visible={modalVisible}
    >
      <Animated.View style={{
        width: "100%",
        flex: 1,
        transform: [{ translateY: translateY }],
        bottom: 0,
      }}
      >
        <View
          style={{
            height: height_modal,
            bottom: 0,
            width: "100%",
            paddingHorizontal: 15,
            position: 'absolute',
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            alignItems: "center"

          }}
        >
          <View
            style={{
              width: '105%',
              alignItems: 'flex-end'
            }}
          >
            <IconButton iconName="close" onPress={() => (handleCloseModal(true))} />
          </View>
          <ScrollView
            style={{
              maxHeight: height_modal,
              width: "100%",
            }}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 15,
              paddingBottom: 200
            }}
          >
            <View
              style={{
                width: '90%',
                alignItems: 'flex-start',
                marginTop: 30,
                marginBottom: 20
              }}
            >
              <H6 text={"Preços"} color={COLORS.grey_6} />
            </View>
            <RangeSlider
              pretext={"R$ "}
              minimumValue={filterOptions.rangePrice.min}
              maximumValue={filterOptions.rangePrice.max}
              setValues={setRangePrice}
              stepValue={5}
            />
            <Separator color={COLORS.black} thickness={0.3} marginTop={30} />
            <View
              style={{
                width: '90%',
                alignItems: 'flex-start',
                marginTop: 30,
                marginBottom: 20
              }}
            >
              <H6 text={"Quantidade (gramas)"} color={COLORS.grey_6} />
            </View>
            <RangeSlider
              postext={" g"}
              minimumValue={filterOptions.rangeQnt.min}
              maximumValue={filterOptions.rangeQnt.max}
              setValues={setRangeQnt}
              stepValue={100}
            />
            <Separator color={COLORS.black} thickness={0.3} marginTop={30} />
            <View
              style={{
                width: '90%',
                alignItems: 'flex-start',
                marginTop: 30,
                marginBottom: 20
              }}
            >
              <H6 text={"Marcas"} color={COLORS.grey_6} />
            </View>
            <Separator color={COLORS.black} thickness={0} marginTop={25} />
            {
              filterOptions.brand && (
                <CheckBoxList
                  options={filterOptions.brand}
                  selected={brand}
                  setSelected={setBrand}
                />
              )
            }
          </ScrollView>
        </View>
        <ModalApply handleCloseModal={handleCloseModal} />
      </Animated.View>
    </ModalBottom>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  modalContent: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: 15,
    position: 'absolute',
    height: "15%",
    bottom: 0,
    width: '100%',
  },
});

export default ModalFilter