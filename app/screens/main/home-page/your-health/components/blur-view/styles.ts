import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    blurView: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#3D3D3D90',
      paddingHorizontal: 10,
    },
    highlightstext: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.white,
    },
  });
export default makeStyles;
