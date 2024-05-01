import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import H4 from '../../text/H4';
import H6_bold from '../../text/H6_bold';

const SimpleButtonGrid = ({ title, data, onButtonPress, gridSize }) => {
  const formatDataIntoRows = (data, numItemsPerRow) => {
    const numberOfRows = Math.ceil(data.length / numItemsPerRow);
    return Array.from({ length: numberOfRows }, (_, rowIndex) => {
      return data.slice(rowIndex * numItemsPerRow, (rowIndex + 1) * numItemsPerRow);
    });
  };

  const rows = formatDataIntoRows(data, gridSize);

  const renderRow = (row, rowIndex) => (
    <View
      key={`row-${rowIndex}`}
      style={[
        styles.row,
      ]
      }
    >
      {row.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.button,
            {
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              backgroundColor: COLORS.white,
              borderColor: COLORS.grey_6,
              marginTop: 10,
              borderWidth: 0.5,
              borderRadius: 2,
            },
          ]}
          onPress={() => onButtonPress(item)}>
          <H6_bold text={item.name} color={COLORS.grey_5} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View
      style={styles.container}
    >
      <H4 text={title} color={COLORS.grey_6} />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <View
          style={styles.gridContainer}
        >
          {rows.map((row, index) => renderRow(row, index))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  scrollView: {
    marginTop: 15,
    width: "100%",
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: "center",
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 15,
    width: 260,
  },
});

export default SimpleButtonGrid;
