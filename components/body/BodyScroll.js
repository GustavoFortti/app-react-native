import React, { useRef } from 'react';
import { SafeAreaView, View, Animated, Keyboard } from 'react-native';
import FadeHeader from './FadeHeader';
import { COLORS } from '../../constants';
import Separator from './Separator';

const BodyScroll = ({
  childrenHeader,
  childrenMain,
  scrollY,
  scrollViewRef,
  currentScrollY,
  headerZIndex,
}) => {

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.background,
    }}>
      <FadeHeader
        scrollY={scrollY}
        headerZIndex={headerZIndex}
      >
        {childrenHeader}
      </FadeHeader>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{
          width: "100%",
          height: "100%",
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
        <Separator color={COLORS.grey_3} thickness={0} marginTop={"30%"} />
        {childrenMain}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default BodyScroll;
