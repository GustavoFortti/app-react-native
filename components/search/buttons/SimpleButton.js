import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS, FONTS, styles } from '../../../constants';
import H6 from '../../text/H6';

const SimpleButton = ({ data, onButtonPress }) => {
  return (
    <TouchableOpacity
      style={{
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
      }}
      onPress={() => onButtonPress(data.search)}
    >
      <H6 text={data.search} color={COLORS.black} />
    </TouchableOpacity>
  );
};

export default SimpleButton;
