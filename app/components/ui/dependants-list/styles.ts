import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

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
      fontSize: RFValue(15),
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
      width: widthToDp(55),
    },
    editText: {
      fontSize: RFValue(13),
      fontFamily: fonts.mulishRegular,
      color: colors.darkPrimary,
      textDecorationLine: 'underline',
      borderBottomColor: colors.darkPrimary,
    },
    relationText: {
      fontSize: RFValue(17),
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
    },
    relationWithText: {
      fontSize: RFValue(17),
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
