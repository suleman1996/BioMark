import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.extraBold,
      color: colors.darkPrimary,
      fontSize: responsiveFontSize(23),
      paddingTop: heightToDp(2),
    },
    subTitle: {
      fontFamily: fonts.light,
      color: colors.black,
      fontSize: responsiveFontSize(18),
      textAlign: 'center',
    },
  });
export default makeStyles;
