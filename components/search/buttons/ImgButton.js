import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS, FONTS, styles } from '../../../constants';
import FadeInImageButton from '../../buttons/FadeInImageButton';
import H6 from '../../text/H6';
import H4 from '../../text/H4';

const ImgButton = ({ data, onButtonPress }) => {
  return (
    <View
      style={{
        marginTop: 30,
      }}
    >
      <H4 text={data.search} color={COLORS.black} />
      <FadeInImageButton
        imageUrl={data.imageUrl}
        imageStyle={{
          height: 110,
          width: "100%",
          borderRadius: 5,
          marginTop: 30,
          backgroundColor: COLORS.white_t_30
        }}
        source={{ uri: data.imageUrl }}
        onButtonPress={onButtonPress}
        buttonName={data.search}
      />
    </View>
  );
};

export default ImgButton;
