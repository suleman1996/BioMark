import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: widthToDp(4),
      paddingVertical: heightToDp(2),
    },
    cardItem: {
      width: widthToDp(92),
      padding: widthToDp(3),
      borderRadius: widthToDp(2),
      marginBottom: heightToDp(2),
      backgroundColor: colors.white,
      // ...GlobalStyles.shadow,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
    },
    editText: {
      fontSize: responsiveFontSize(15),
      fontFamily: GlobalFonts.regular,
      color: colors.darkPrimary,
      textDecorationLine: 'underline',
      borderBottomColor: colors.darkPrimary,
    },
    relationText: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
    },
    relationWithText: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.light,
      color: colors.darkPrimary,
    },
    headerEnd: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editBtn: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: widthToDp(3),
      paddingHorizontal: widthToDp(3),
      marginRight: widthToDp(2),
      height: heightToDp(3.5),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default makeStyles;
