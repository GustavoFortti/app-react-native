import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants';
import H6 from '../text/H6'; // Certifique-se que o componente H6 não esteja impedindo o onPress

const IconButton = ({ iconName, text, onPress }) => (
  <View>
    <TouchableOpacity style={styles.button} onPress={onPress} >
      <Icon name={iconName} size={20} color={COLORS.grey_6} />
      <View style={styles.textContainer}>
        <H6 text={text} color={COLORS.grey_6} />
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 50,
  },
  textContainer: {
    marginLeft: 10,
  },
});

export default IconButton;
