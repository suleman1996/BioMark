import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      // position: 'absolute',
    },
    bottomBtnContainer: {
      // alignItems: 'center',
      bottom: 0,
      paddingBottom: heightToDp(3),
      width: widthToDp(100),
      flex: 1,
    },
    name: {
      fontSize: responsiveFontSize(25),
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
      textAlign: 'center',
    },
    subHead: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.light,
      color: colors.black,
      textAlign: 'center',
      paddingBottom: 8,
    },
    noDependetView: {
      alignItems: 'center',
    },
    emptyView: {
      marginTop: '50%',
      alignItems: 'center',
      width: '100%',
    },
  });

export default makeStyles;
