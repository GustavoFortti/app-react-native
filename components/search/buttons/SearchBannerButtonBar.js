import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS, FONTS, styles } from '../../../constants';
import H6 from '../../text/H6';

const SearchBannerButtonBar = ({ data, onButtonPress, buttonStyle }) => {
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={() => onButtonPress(data.search)}
    >
      <H6 text={data.search} color={COLORS.black} />
    </TouchableOpacity>
  );
};

export default SearchBannerButtonBar;
