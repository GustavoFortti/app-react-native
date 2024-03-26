import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS, FONTS, styles } from '../../../constants';
import FadeInImageButton from '../../buttons/FadeInImageButton';
import H6 from '../../text/H6';

const SearchBannerImgButtonBar = ({ data, onButtonPress, buttonStyle }) => {
  return (
    <View
      style={{
        marginTop: buttonStyle.marginTop,
        marginRight: buttonStyle.marginRight,
      }}
    >
      <FadeInImageButton
        imageUrl={data.imageUrl}
        imageStyle={{
          height: buttonStyle.height,
          width: buttonStyle.width,
          borderRadius: buttonStyle.borderRadius,
        }}
        source={{ uri: data.imageUrl }}
        onButtonPress={onButtonPress}
        buttonName={data.search}
      >
        
        <H6 text={data.search} color={COLORS.grey_6} />
      </FadeInImageButton>
    </View>
  );
};

export default SearchBannerImgButtonBar;
