import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalBottom from '../../body/ModalBottom';
import { Button } from 'react-native-elements';
import SimpleButton from '../../buttons/SimpleButton';
import { COLORS } from '../../../constants';
import RadioButton from '../../buttons/RadioButoon';
import IconButton from '../../buttons/IconButton';

const ModalSort = ({
  modalVisible,
  setModalVisible,
  sortOptions,
  setSortOption,
}) => {
  const { height } = useWindowDimensions();
  const height_15 = height * 0.15;
  const height_70 = height * 0.70;

  const [selected, setSelected] = useState('0');

  useEffect(() => {
    setSortOption(selected)
  }, [selected])
  
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
    outputRange: [height_70, 0],
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
      handleCloseModal={handleCloseModal}
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
            height: 370 + height_15,
            bottom: 0,
            width: "100%",
            position: 'absolute',
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            alignItems: "center"

          }}
        >
          <IconButton iconName="chevron-down" onPress={() => (handleCloseModal())} />
          <RadioButton
            options={sortOptions}
            selected={selected}
            setSelected={setSelected}
            style={{
              paddingHorizontal: "7%",
              height: 60,
            }}
          />
        </View>
        <View
          style={[
            styles.buttonContainer,
            {
              width: "100%",
              backgroundColor: "white",
              borderTopWidth: 0.3,
              // IOS
              shadowColor: COLORS.grey_6,
              shadowOffset: { width: 0, height: -1 },
              shadowOpacity: 0.15,
              shadowRadius: 10,

              // android
              elevation: 20,
            }
          ]}
        >
          <View
            style={{
              paddingHorizontal: "5%",
            }}
          >
            <SimpleButton
              text="Aplicar"
              style={{
                backgroundColor: COLORS.black,
              }}
              colorText={COLORS.white}
              onPress={() => (handleCloseModal())}
            />
          </View>
        </View>
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