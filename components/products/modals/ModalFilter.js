import { View, Text, StyleSheet, Animated, useWindowDimensions, ScrollView, Keyboard, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalBottom from '../../body/ModalBottom';
import { Button } from 'react-native-elements';
import SimpleButton from '../../buttons/SimpleButton';
import { COLORS } from '../../../constants';
import RadioButton from '../../buttons/RadioButoon';
import IconButton from '../../buttons/IconButton';
import CheckBoxButton from '../../buttons/CheckBoxButton';
import Separator from '../../body/Separator';
import ModalApply from './ModalApply';
import RangeSlider from '../../buttons/RangeSlider';
import H7 from '../../text/H7';
import H6 from '../../text/H6';

const ModalFilter = ({
  modalVisible,
  setModalVisible,
  setFilterOption,
}) => {
  const { height } = useWindowDimensions();
  const height_15 = height * 0.15;
  const height_80 = height * 0.80;
  const height_modal = Math.min(height_15 + 600, height_80)

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [rangePrice, setRangePrice] = useState({ min: 0, max: 100 });
  const [rangeQnt, setRangeQnt] = useState({ min: 0, max: 4000 });

  const typesOfFlavors = [
    { label: 'Option 1', value: '1' },
  ];

  const brands = [
    { label: "Adaptogen", value: '1' },
    { label: "Atlhetica Nutrition", value: '2' },
    { label: "Black Skull", value: '3' },
    { label: "Boldsnacks", value: '4' },
    { label: "Dark Lab", value: '5' },
    { label: "Darkness", value: '6' },
    { label: "Dux", value: '7' },
    { label: "Growth ", value: '8' },
    { label: "Integralmedica", value: '9' },
    { label: "Iridium Labs", value: '10' },
    { label: "Max Titanium", value: '11' },
    { label: "New Millen", value: '12' },
    { label: "Nutrata", value: '13' },
    { label: "Probiotica", value: '14' },
    { label: "Puravida", value: '15' },
    { label: "Truesource", value: '16' },
    { label: "Under Labz", value: '17' },
    { label: "Vitafor", value: '18' },
  ];

  // useEffect(() => {
  //   setFilterOption(selectedOptions)
  // }, [selectedOptions])

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

  const handleCloseModal = () => {
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
            <IconButton iconName="close" onPress={() => (handleCloseModal())} />
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
              minimumValue={0}
              maximumValue={100}
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
              minimumValue={0}
              maximumValue={4000}
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
            <CheckBoxButton
              options={brands}
              selected={selectedOptions}
              setSelected={setSelectedOptions}
            />
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