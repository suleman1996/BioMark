import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      height: heightToDp(6),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: widthToDp(1.5),
      width: '100%',
      maxWidth: widthToDp(86),
      borderWidth: 0.2,
      borderColor: colors.inactive,
    },
    text: {
      color: colors.white,
      fontFamily: fonts.semiBold,
      fontSize: responsiveFontSize(19),
    },
  });

export default makeStyles;
