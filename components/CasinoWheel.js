import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const WheelPicker = () => {
  const items = ['Whey Protein', 'Creatina', 'Barrinhas', 'Multivitaminico', 'Whey Gourmet', 'Cafeina', 'Albumina', 'Beta-alanina', 'BCAA', 'Hipercalorico', 'Glutamina', 'Omega-3', 'Pré-treino', 'Pasta de Amendoin', 'Leite', 'Workout'];
  const itemHeight = 60; // Defina a altura do item aqui
  const chanceIndex = -3
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedIndex, setSelectedIndex] = useState(5); // Estado para rastrear o índice selecionado

  console.log("selectedIndex")
  console.log(selectedIndex)

  const renderItem = ({ item, index }) => {
    const inputRange = [
      ((index + chanceIndex) - 3) * itemHeight,
      ((index + chanceIndex) - 1) * itemHeight,
      (index + chanceIndex) * itemHeight,
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.93, 1, 0.93],
    });
    
    const itemStyle = {
      height: itemHeight,
      transform: [{ scale }],
    };

    return (
      <Animated.View style={[itemStyle, styles.animatedContainer]}>
        <Text style={{ color: index === selectedIndex ? 'red' : '#000', ...styles.pickerItem }}>{item}</Text>
      </Animated.View>
    );
  };
  const longData = Array(2).fill(items).flat(); // Create a longer list by repeating the items

  const modifiedItems = ['', ...items, ''];

  const momentumScrollEnd = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight) - chanceIndex;
    console.log("Item escolhido:", modifiedItems[index + 2]); // Adicionando +1 para ajustar índices devido aos itens vazios
    setSelectedIndex(index + 1); // Atualize o índice selecionado
  };

  return (
    <View style={{ height: itemHeight * 15 }}>
      <Animated.FlatList
        data={longData} // Use longData instead of modifiedItems
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={momentumScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * (index + chanceIndex),
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  indicatorHolder: {
    position: 'absolute',
  },
  indicator: {
    width: 120,
    height: 1,
    backgroundColor: '#ccc',
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
});

export default WheelPicker;
