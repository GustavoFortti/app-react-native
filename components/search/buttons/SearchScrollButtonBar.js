import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { COLORS } from '../../../constants';
import H4 from '../../text/H4';

const SearchScrollButtonBar = ({ title, data, onButtonPress, buttonStyle }) => {
  const renderButton = ({ item }) => (
    <TouchableOpacity
      style={[{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: COLORS.grey_2,
        shadowColor: COLORS.grey_6,
      }, buttonStyle]}
      onPress={() => onButtonPress(item)}
    >
      <Text>{item.search}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <H4 text={title} />
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <FlatList
          data={data}
          renderItem={renderButton}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 0 }}
        />
      </View>
    </View>
  );
};

export default SearchScrollButtonBar;