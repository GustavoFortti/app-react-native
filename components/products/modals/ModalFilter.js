import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ModalBottom from '../../body/ModalBottom';
import { Button } from 'react-native-elements';

const ModalFilter = ({ modalVisible, setModalVisible }) => {
  return (
    <ModalBottom
      visible={modalVisible}
      height={"80%"}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Conteúdo do Modal</Text>
        <Button
          title="Fechar"
          onPress={() => setModalVisible(false)}
        />
      </View>
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
    height: 200, // Ajuste conforme necessário
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default ModalFilter