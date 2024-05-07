import React, { useState } from 'react';
import { SafeAreaView, View, Animated, Keyboard, useWindowDimensions, TouchableOpacity, Text } from 'react-native';
import Header from './Header';
import { COLORS } from '../../constants';
import H1 from '../text/H1';

const BodyScroll = ({
  childrenSubHeader,
  childrenHeader,
  childrenMain,
  childrenModal,
  scrollY,
  scrollViewRef,
  currentScrollY,
  paddingTopScrollPercent,
  handleEndPage
}) => {
  const { height } = useWindowDimensions();
  const height_20 = height * 0.20;
  const height_22 = height * 0.22;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: event => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const currentPosition = contentOffset.y;
        const scrollViewHeight = layoutMeasurement.height;
        const totalContentHeight = contentSize.height;

        if (scrollViewRef.current) {
          currentScrollY.current = currentPosition;
        }

        if (currentPosition + scrollViewHeight >= totalContentHeight) {
          if (handleEndPage) {
            handleEndPage();
          }
        }
      },
    }
  );

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.background,
    }}>
      <View
        style={{
          height: "10%",
          paddingTop: "13%",
          width: "100%",
          top: 0,
          zIndex: 1,
          position: 'absolute',
          backgroundColor: COLORS.background,
        }}
      >
        {childrenSubHeader}
      </View>
      <Header
        scrollY={scrollY}
        heightSize={height_20}
      >
        {childrenHeader}
      </Header>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: paddingTopScrollPercent ? paddingTopScrollPercent * height : height_22,
          paddingBottom: 100
        }}
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          position: 'absolute',
        }}
        onScroll={onScroll}
      >
        {childrenMain}
      </Animated.ScrollView>
      {childrenModal}
    </SafeAreaView>
  );
};

export default BodyScroll;
