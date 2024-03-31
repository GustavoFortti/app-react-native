import React, { useRef } from 'react';
import { SafeAreaView, View, Animated, Keyboard, useWindowDimensions } from 'react-native';
import Header from './Header';
import { COLORS } from '../../constants';
import Separator from './Separator';
import H1 from '../text/H1';

const BodyScroll = ({
  childrenSubHeader,
  childrenHeader,
  childrenMain,
  scrollY,
  setScrollY,
  scrollViewRef,
  currentScrollY,
}) => {
  const { height } = useWindowDimensions();
  const height_20 = height * 0.20;
  const height_22 = height * 0.22;

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
          paddingTop: height_22,
          paddingBottom: 100
        }}
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          position: 'absolute',
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: event => {
              if (scrollViewRef.current) {
                currentScrollY.current = event.nativeEvent.contentOffset.y;
              }
            },
          }
        )}
      >
        {childrenMain}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default BodyScroll;
