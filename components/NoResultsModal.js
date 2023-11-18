import React, { useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

const NoResultsModal = ({ visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 600); // Fecha o modal após 1,5 segundos

      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, onClose]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: '30%', // Ajuste a posição vertical conforme necessário
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
          activeOpacity={1} // Isso permite que os toques não passem pelo modal
          onPress={onClose}
        >
          <View
            style={{
              backgroundColor: COLORS.grey_title_sub,
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 24, fontFamily: 'eurostile', color: COLORS.white }}>
              Nenhum resultado encontrado.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NoResultsModal;
