import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,

  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',

    // Global Colors
    primary: '#1B96D8',
    lightPrimary: '#cae1f3',
    darkPrimary: '#06599E',
    primaryGray: '#FAFAFA',
    white: '#FFFFFF',
    opacityBlack: 'hsla(133, 50%, 7%, 0.18)',
    gray: '#EBEFF2',
    bgContainer: '#E5E5E5',
    red: 'red',
    transparentBlack: 'rgba(52, 52, 52, 0.8)',
    heading: '#06599E',
    blue: '#1B96D8',
    black: '#000',
    navyblue: '#04589E',
    lightGrey: '#8493AE',
    darkGray: '#A9A9A9',
    fieldGrey: '#DCDCDC',
    gainsboro: '#DCDCDC',

    // Colors
    whiteColor: '#FFFFFF',
    inputBg: '#EBEFF2',
    placeHolder: '#8493AE',
    danger: '#FF0000',
    inactive: '#8493AE',
    smoke: '#808080',
    lightBlue: '#C9E1F2',
    darBlue: '#273859',
    disable: '#8493AE60',
    bg: '#3D3D3D90',
    redish: '#EE5407',
    greenish: '#03DAC6',
    lightGray: '#DCDCDC',
  },

  // fonts: configureFonts({
  //   web: {
  //     regular: {
  //       fontFamily: 'Mukta',
  //       fontWeight: 'normal',
  //     },
  //     medium: {
  //       fontFamily: 'Mukta-Medium',
  //       fontWeight: 'normal',
  //     },
  //     light: {
  //       fontFamily: 'Mukta-Light',
  //       fontWeight: 'normal',
  //     },
  //     thin: {
  //       fontFamily: 'Mukta-ExtraLight',
  //       fontWeight: 'normal',
  //     },
  //   },
  //   ios: {
  //     regular: {
  //       fontFamily: 'Mukta',
  //       fontWeight: 'normal',
  //     },
  //     medium: {
  //       fontFamily: 'Mukta-Medium',
  //       fontWeight: 'normal',
  //     },
  //     light: {
  //       fontFamily: 'Mukta-Light',
  //       fontWeight: 'normal',
  //     },
  //     thin: {
  //       fontFamily: 'Mukta-ExtraLight',
  //       fontWeight: 'normal',
  //     },
  //     semiBold: {
  //       fontFamily: 'Mukta-SemiBold',
  //     },
  //   },
  //   android: {
  //     regular: {
  //       fontFamily: 'Mukta',
  //       fontWeight: 'normal',
  //     },
  //     medium: {
  //       fontFamily: 'Mukta-Medium',
  //       fontWeight: 'normal',
  //     },
  //     light: {
  //       fontFamily: 'Mukta-Light',
  //       fontWeight: 'normal',
  //     },
  //     thin: {
  //       fontFamily: 'Mukta-ExtraLight',
  //       fontWeight: 'normal',
  //     },
  //   },
  // }),
};

export default theme;
