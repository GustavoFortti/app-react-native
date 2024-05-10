import React, { memo } from 'react';
import { Animated, VirtualizedList } from 'react-native';
import LongProductCard from '../cards/LongProductCard';

const GridLongProduct = memo(({
  products,
  navigation,
  paddingTop,
  scrollY,
  scrollViewRef,
  currentScrollY,
}) => {
  const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);

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

  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;

  return (
    <AnimatedVirtualizedList
      style={{ width: "100%" }}
      data={products}
      getItem={getItem}
      getItemCount={getItemCount}
      keyExtractor={(item, index) => item.ref || index.toString()}
      renderItem={({ item }) => <LongProductCard item={item} navigation={navigation} />}
      initialNumToRender={5}
      maxToRenderPerBatch={4}
      scrollEnabled={true}
      onScroll={onScroll}
      contentContainerStyle={{
        paddingTop,
        paddingBottom: 100
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}, areEqual);

function areEqual(prevProps, nextProps) {
  return prevProps.products === nextProps.products;
}

export default GridLongProduct;
