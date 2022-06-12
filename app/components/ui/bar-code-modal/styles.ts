import { StyleSheet } from 'react-native';
// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from '../../../utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(1.5),
      width: widthToDp(88),
      padding: widthToDp(3),
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    title: {
      fontSize: responsiveFontSize(25),
      color: colors.black,
      fontFamily: GlobalFonts.medium,
      paddingHorizontal: widthToDp(3),
      textAlign: 'left',
      width: '100%',
      paddingTop: heightToDp(1),
    },
    cross: {
      width: '100%',
      alignItems: 'flex-start',
      paddingLeft: widthToDp(2),
      paddingTop: heightToDp(1),
    },
    title2: {
      fontSize: responsiveFontSize(25),
      color: colors.black,
      fontFamily: GlobalFonts.light,
      textAlign: 'center',
      width: '100%',
    },
  });

export default makeStyles;
