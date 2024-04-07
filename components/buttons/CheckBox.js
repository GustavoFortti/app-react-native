import React from 'react';
import { COLORS } from '../../constants';
import SimpleButton from './SimpleButton';
import H7 from '../text/H7';

const CheckBox = ({ label, selected, style, onPress }) => {
  return (
    <SimpleButton
      onPress={onPress}
      style={[{
        width: '100%',
        backgroundColor: selected ? COLORS.grey_6 : COLORS.white,
      }, style]}
    >
      <H7 text={label} color={selected ? COLORS.white : COLORS.grey_6} ></H7>
    </SimpleButton>
  )
};

export default CheckBox;