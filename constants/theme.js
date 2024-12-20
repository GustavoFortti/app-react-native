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
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderRadius: 3,
    marginTop: "10%",
  },
  button_black_2: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderRadius: 3,
  },
  button_trasparent: {
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderRadius: 3,
  },
  buttonText_black: {
    color: 'black',
    fontSize: 22,
    fontFamily: "eurostile",
    letterSpacing: 4,
  },
  buttonText_white: {
    color: 'white',
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
  background: "#FFFFFF",
  background_0: "#FFFFFF",
  background_1: "#FFFFFF",
  background_2: "#FFFFFF",
  background_3: "#FFFFFF",
  background_4: "#FFFFFF",
  background_5: "#FFFFFF",
  background_6: "#FFFFFF",
  white_0: "#FEFEFE",
  grey_0: "#F0F0F0",
  grey_1: "#E1E1E1",
  grey_2: "#C0C0C0",
  grey_3: "#ACACAC",
  grey_4: "#8F8F8F",
  grey_5: "#707070",
  grey_6: "#232323",
  grey_0_t: "rgba(240, 240, 240, 0.7)",
  grey_1_t: "rgba(225, 225, 225, 0.7)",
  grey_2_t: "rgba(192, 192, 192, 0.7)",
  grey_3_t: "rgba(172, 172, 172, 0.7)",
  grey_4_t: "rgba(143, 143, 143, 0.7)",
  grey_5_t: "rgba(112, 112, 112, 0.7)",
  grey_6_t: "rgba(35, 35, 35, 0.7)",
  white_t: "rgba(250, 250, 250, 0.95)",
  white_t_30: "rgba(250, 250, 250, 0.30)",
  black_t_30: "rgba(0, 0, 0, 0.90)",
  pastel_yellow: "#FDFD96",
  pastel_pink: "#FFD1DC",
  pastel_blue: "#AEC6CF",
  pastel_green: "#B0E57C",
  pastel_purple: "#CFA0E9",
  pastel_orange: "#FFB347",
  pastel_peach: "#FFDAB9",
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
    fontSize: 52,
    fontFamily: 'orbitron_regular',
    color: COLORS.grey_6,
    letterSpacing: 4,
  },
  largeTitle: {
    fontSize: 52,
    fontFamily: 'orbitron_regular',
    color: COLORS.grey_6,
    letterSpacing: 4,
  },
  title: {
    fontSize: 36,
    fontFamily: 'eurostile',
    color: COLORS.black,
    letterSpacing: 4,
  },
  text_22_grey_5: {
    fontSize: 22,
    fontFamily: "eurostile",
    color: COLORS.grey_5,
    letterSpacing: 4,
  },
  text_22_white: {
    fontSize: 22,
    fontFamily: "eurostile",
    color: COLORS.white,
    letterSpacing: 4,
  },
  text_18_black: {
    fontSize: 18,
    fontFamily: "eurostile",
    color: COLORS.black,
    letterSpacing: 4,
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