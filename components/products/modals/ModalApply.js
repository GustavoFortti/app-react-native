import React from 'react';
import { StyleSheet, View } from 'react-native';
import SimpleButton from '../../buttons/SimpleButton';
import { COLORS } from '../../../constants';

const ModalApply = ({ handleCloseModal }) => {
  return (
    <View
      style={[
        styles.buttonContainer,
        {
          width: "100%",
          backgroundColor: "white",
          flexDirection: 'row', 
          justifyContent: "space-between",
          paddingHorizontal: 20,
          
          borderTopWidth: 0.3,
          shadowColor: COLORS.grey_6,
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 20,
        }
      ]}
    >
      <View
        style={{
          width: "49.8%"
        }}
      >
        <SimpleButton
          text="Cancelar"
          style={{
            backgroundColor: COLORS.white,
          }}
          colorText={COLORS.black}
          onPress={() => handleCloseModal()}
        />
      </View>
      <View
        style={{
          width: "49.8%"
        }}
      >
        <SimpleButton
          text="Aplicar"
          style={{
            backgroundColor: COLORS.grey_6,
          }}
          colorText={COLORS.white}
          onPress={() => handleCloseModal()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
      paddingTop: 15,
      position: 'absolute',
      height: "15%",
      bottom: 0,
      width: '100%',
    },
  });

export default ModalApply;
