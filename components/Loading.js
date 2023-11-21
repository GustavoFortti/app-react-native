import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants';

const Loading = ({ isActive }) => {
  return (
    <>
      {isActive ? (
      <SafeAreaView
        style={{
          height: "0%",
          width: "0%",
          top: "-30%",
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue'
        }}
      >
        <ActivityIndicator size='large' color={COLORS.grey_3} />
      </SafeAreaView>
      ) : (null)}
    </>
  );
};

export default Loading;