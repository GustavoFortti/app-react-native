import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { COLORS } from '../../constants';

const RangeSlider = ({ pretext, postext, minimumValue, maximumValue, setValues, stepValue }) => {
  const [values, setValuesState] = useState([minimumValue, maximumValue]);
  const [sliderWidth, setSliderWidth] = useState(Dimensions.get('window').width * 0.8);

  const handleChange = (values) => {
    setValuesState(values);
    setValues({ min: values[0], max: values[1] });
  };

  useEffect(() => {
    const updateWidth = () => {
      const width = Dimensions.get('window').width * 0.8;
      setSliderWidth(width);
    };

    const subscription = Dimensions.addEventListener('change', updateWidth);

    return () => {
      if (subscription.remove) {
        subscription.remove();
      } else {
        console.warn('Event listener removal method not supported.');
      }
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: "90%",
        height: 100,
      }}>
      <View style={{ width: "100%", marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16 }} >{pretext}{values[0]}{postext}</Text>
        <Text style={{ fontSize: 16 }} >{pretext}{values[1]}{postext}</Text>
      </View>
      <MultiSlider
        values={[values[0], values[1]]}
        sliderLength={sliderWidth}
        onValuesChange={handleChange}
        min={minimumValue}
        max={maximumValue}
        step={stepValue}
        selectedStyle={{
          backgroundColor: COLORS.grey_5,
        }}
        markerStyle={{
          borderColor: COLORS.grey_6,
          borderRadius: 15,
          backgroundColor: 'white',
        }}
      />
    </View>
  );
};

export default RangeSlider;
