import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'white',
      paddingHorizontal: 35,
      paddingVertical: 10,
      borderRadius: 3,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontFamily: "eurostile",
      letterSpacing: 2,
    },
    button_black: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 45,
      paddingVertical: 10,
      borderRadius: 3,
      marginTop: 20,
    },
    buttonText_black: {
      color: 'black',
      fontSize: 22,
      fontFamily: "eurostile",
      letterSpacing: 4,
    },
  });

export const COLORS = {
    black: "#000000",
    gray: "#F5F5F5",
    white: "#FFFFFF",
    red: "#EE4B2B",
    blue_title: '#396A8A',
    blue_back: '#EAF6FE',
    grey_title: '#3F3F3F',
    grey_title_sub: '#858585',
    grey_title_mid: '#7E7E7E',
    grey_title_low: '#3C3C3C',
    grey_back: '#EBEBEB',
    grey_back_low: '#FCFCFC',
    grey_hard: "#0E0E0E",
}

export const SIZES = {
    // global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    padding3: 16,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 20,
    h3: 18,
    h4: 16,
    body1: 30,
    body2: 20,
    body3: 18,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,
}

export const FONTS = {
    largeTitle: {
        fontFamily: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: 'bold', fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontFamily: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'regular', fontSize: SIZES.body4, lineHeight: 20 },
}

const appTheme = { COLORS, SIZES, FONTS, styles }

export default appTheme