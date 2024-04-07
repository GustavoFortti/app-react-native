import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const ModalBottom = ({
  visible,
  children,
  handleCloseModal
}) => {
  const [showModal, setShowModal] = useState(visible);

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={showModal}
    >
      <View
        style={styles.overlay}
        activeOpacity={1}
      >
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',

  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default ModalBottom;
