import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalBottom from '../../body/ModalBottom';
import RadioButton from '../../buttons/RadioButoon';
import IconButton from '../../buttons/IconButton';
import ModalApply from './ModalApply';

const ModalSort = ({
  modalVisible,
  setModalVisible,
  sortOptions,
  sortOption,
  setSortOption,
  setApplyQuery
}) => {
  const { height } = useWindowDimensions();
  const height_25 = height * 0.25;
  const height_80 = height * 0.80;
  const height_modal = Math.min(height_25 + 400, height_80)

  const [sort, setSort] = useState(sortOption.value);

  useEffect(() => {
    const sortSelectd = sortOptions.find((item) => item.value === sort);
    setSortOption(sortSelectd)
  }, [sort])

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
      const sort = sortOptions.find((option) => option.value === sortOption.value);
      setSortOption(sort)
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
        height: 1000,
        bottom: 0,
      }}
      >
        <View
          style={{
            height: height_modal,
            bottom: 0,
            paddingHorizontal: 15,
            width: "100%",
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
          <RadioButton
            options={sortOptions}
            selected={sort}
            setSelected={setSort}
            style={{
              paddingHorizontal: "3%",
              height: 60,
            }}
          />
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

export default ModalSort