import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../../constants';
import FadeInImageButton from '../../buttons/FadeInImageButton';
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
        buttonName={data.index}
      />
    </View>
  );
};

export default ImgButton;
