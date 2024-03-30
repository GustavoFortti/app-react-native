import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Svg, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { COLORS, styles } from '../../../constants';
import H6_bold from '../../text/H6_bold';

const GradientButton = ({ data, onButtonPress, buttonStyle }) => {
  const startColor = COLORS.grey_0;
  const middleColor = COLORS.grey_0;
  const endColor = COLORS.grey_0;

  return (
    <TouchableOpacity
      key={data.id}
      onPress={() => onButtonPress(data.search)}
      style={[buttonStyle, { position: 'relative'}]}
    >
      <View style={{ position: 'absolute', zIndex: 0, width: '100%', height: '100%' }}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={startColor} stopOpacity="1" />
              <Stop offset="0.5" stopColor={middleColor} stopOpacity="1" />
              <Stop offset="1" stopColor={endColor} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </View>
      <View style={{ zIndex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <H6_bold text={data.search} color={COLORS.grey_6_t} />
      </View>
    </TouchableOpacity>
  );
};

export default GradientButton;
