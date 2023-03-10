import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthToDp(92),
      backgroundColor: colors.white,
      borderRadius: widthToDp(3),
      paddingHorizontal: widthToDp(4),
      paddingVertical: heightToDp(2),
      alignItems: 'flex-start',
    },
    header: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      fontFamily: GlobalFonts.medium,
      fontSize: responsiveFontSize(25),
      color: colors.darkPrimary,
    },
    contentText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(20),
      color: 'gray',
      lineHeight: responsiveFontSize(30),
      marginTop: heightToDp(3),
      marginBottom: heightToDp(3),
    },
  });

export default makeStyles;
