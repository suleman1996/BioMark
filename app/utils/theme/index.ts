import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,

  colors: {
    ...DefaultTheme.colors,

    // Global Colors
    primary: '#1B96D8',
    lightPrimary: '#cae1f3',
    darkPrimary: '#06599E',
    primaryGray: '#FAFAFA',
    white: '#FFFFFF',
    opacityBlack: 'hsla(133, 50%, 7%, 0.18)',
    opacityBlackDark: 'hsla(000, 1%, 10%, 0.9)',
    gray: '#EBEFF2',
    bgContainer: '#E5E5E5',
    red: 'red',
    transparentBlack: { background: '#343434', opacity: 0.8 },
    heading: '#06599E',
    blue: '#1B96D8',
    lightBlueish: '#2CBDFC',
    black: '#000',
    navyblue: '#04589E',
    lightGrey: '#8493AE',
    darkGray: '#A9A9A9',
    fieldGrey: '#DCDCDC',
    green: 'lightgreen',
    shineBlue: '#2C6CFC',

    // Colors
    inputBg: '#EBEFF2',
    danger: '#FF0000',
    inactive: '#8493AE',
    smoke: '#808080',
    lightBlue: '#C9E1F2',
    darBlue: '#273859',
    disable: '#8493AE60',
    bg: '#3D3D3D90',
    redish: '#EE5407',
    greenish: '#03DAC6',
    lightGreen: '#54CB83',
    greenOpacity: '#03DAC610',
    greenDark: '#00AC88',
    lightYellow: '#FFD75E',
    dangerRed: '#EA4C59',
    lightDark: '#455066',
    container: '#FAFAFA',
    innerBackground: '#F0F0EF',
    pureRed: '#EB3342',
    dangerBg: '#EA4C5920',

    // health risk status color

    Obese: '#EB3342',
    High: '#EB3342',
    none: '#D9DFEB',
    normal: '#54CB83',
    high: '#EB3342',
    bad: '#EB3342',

    //gradient
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
