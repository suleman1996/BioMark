import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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
      fontFamily: fonts.mulishRegular,
      fontSize: RFValue(12),
      color: colors.white,
    },
  });
export default makeStyles;
