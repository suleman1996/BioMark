import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontFamily: GlobalFonts.bold,
      fontSize: RFValue(13),
      color: colors.heading,
      marginTop: 20,
    },
    bar: {
      backgroundColor: colors.fieldGrey,
      width: '100%',
      height: 10,
      borderRadius: 10,
      marginTop: 20,
      flexDirection: 'row',
    },
    smallDot: {
      backgroundColor: colors.heading,
      height: '100%',
      width: 10,
      borderRadius: 5,
    },
    bigDot: {
      backgroundColor: colors.heading,
      height: 25,
      width: 25,
      borderRadius: 13,
      top: -8,
    },
    selectView: {
      width: '20%',
      alignItems: 'center',
    },
    headingView: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 10,
    },
    headingText: {
      fontFamily: GlobalFonts.regular,
      fontSize: RFValue(10),
      color: colors.heading,
      fontWeight: 'bold',
    },
  });
export default makeStyles;
