import { StyleSheet } from 'react-native';

import { GlobalFonts } from 'utils/theme/fonts';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    textFieldStyle: {
      fontSize: responsiveFontSize(40),
      width: '60%',
      color: colors.blue,
      backgroundColor: colors.gray,
      fontFamily: GlobalFonts.bold,
      borderWidth: 0,
      borderBottomWidth: 0,
    },
    rowContainer: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: colors.gray,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: widthToDp(2),
      marginTop: 3,
    },
    label: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
    },
  });
export default makeStyles;
