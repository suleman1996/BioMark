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
    transparentWhite: 'rgba(255,255,255,0.4)',
    heading: '#06599E',
    blue: '#1B96D8',
    blueTransparent: 'rgba(6, 89, 157, 0.15)',
    lightBlueish: '#2CBDFC',
    black: '#000',
    navyblue: '#04589E',
    lightGrey: '#8493AE',
    darkGray: '#A9A9A9',
    fieldGrey: '#DCDCDC',
    green: 'lightgreen',
    shineBlue: '#2C6CFC',
    selected: '#7E7E7E',
    unSelected: '#C8C8C8',
    inputLarge: '#F5F5F5',

    // Colors
    inputBg: '#EBEFF2',
    danger: '#FF0000',
    inactive: '#8493AE',
    smoke: '#808080',
    lightBlue: '#C9E1F2',
    darBlue: '#273859',
    disable: '#8493AE60',
    bg: '#3D3D3D90',
    targetCardsDull: '#EDEDED',
    targetsTab: '#58AEFC',
    redish: '#EE5407',
    greenish: '#03DAC6',
    lightGreen: '#54CB83',
    greenOpacity: '#03DAC610',
    blueOpacity: '#B8CDED',
    greenDark: '#00AC88',
    medicationRed: '#E6404C',
    lightYellow: '#FFD75E',
    dangerRed: '#EA4C59',
    lightDark: '#455066',
    container: '#FAFAFA',
    innerBackground: '#F0F0EF',
    pureRed: '#EB3342',
    dangerBg: '#EA4C5920',
    abnormal: '#FFEAF2',

    // health risk status color

    Obese: '#EB3342',
    High: '#EB3342',
    none: '#D9DFEB',
    normal: '#54CB83',
    high: '#EB3342',
    bad: '#EB3342',

    //gradient
    //Logs Colors
    logsGreen: '#35B14F',
    logsRed: '#EB3342',
  },
};

export default theme;
