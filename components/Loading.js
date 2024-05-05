import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants';

const Loading = ({ isActive }) => {
  return (
    <>
      {isActive ? (
        <View
          style={{
            paddingTop: 50
          }}
        >
          <ActivityIndicator size='large' color={COLORS.grey_3} />
        </View>
      ) : (null)}
    </>
  );
};

export default Loading;