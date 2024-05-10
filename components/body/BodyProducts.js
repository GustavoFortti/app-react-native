import React, { useState, memo, useEffect } from 'react';
import { SafeAreaView, Animated, VirtualizedList, View, useWindowDimensions } from 'react-native';
import Header from './Header';
import LongProductCard from '../products/cards/LongProductCard';
import { COLORS } from '../../constants';

const BodyProducts = ({
  childrenSubHeader,
  childrenHeader,
  childrenModal,
  scrollY,
  scrollViewRef,
  currentScrollY,
  handleEndPage,
  paddingTopScrollPercent,
  data,
  navigation,
}) => {
  const { height } = useWindowDimensions();
  const height_20 = height * 0.20;
  const height_22 = height * 0.22;
  const paddingTop = paddingTopScrollPercent ? paddingTopScrollPercent * height : height_22;

  const [products, setProducts] = useState(data);
  
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
            console.log("++++++++++++++++++>>");
            handleEndPage();
          }
        }
      },
    }
  );

  console.log(products.length);
  useEffect(() => {
    setProducts(data);
  }, [data]);
  
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
      {products && (
        <GridLongProduct
          products={products}
          navigation={navigation}
          paddingTop={paddingTop}
          onScroll={onScroll}
        />
      )}
      {childrenModal}
    </SafeAreaView>
  );
};

const GridLongProduct = memo(({
  products,
  navigation,
  paddingTop,
  onScroll
}) => {
  const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);

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

export default BodyProducts;