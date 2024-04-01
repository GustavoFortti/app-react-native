import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import H6 from '../text/H6';

const SimpleButton = ({ text, onPress, style, colorText=COLORS.black }) => {
  return (
    <TouchableOpacity
      style={[{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: "100%",
        backgroundColor: COLORS.white,
        borderColor: COLORS.grey_6,
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 2,
      }, style]}
      onPress={() => onPress()}
    >
      <H6 text={text} color={colorText} />
    </TouchableOpacity>
  );
};

export default SimpleButton;
