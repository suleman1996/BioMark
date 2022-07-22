import { StyleSheet, Dimensions } from 'react-native';

import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: colors.white,
    },
    body: {
      flex: 1,
      height: Dimensions.get('window').height * 0.8,
      margin: 10,
      borderRadius: 10,
      backgroundColor: colors.white,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      paddingHorizontal: 15,
    },
    title: {
      fontFamily: fonts.regular,
      fontSize: 16,
      marginVertical: 20,
      color: colors.heading,
    },
    inputLablel: {
      fontFamily: fonts.bold,
      color: colors.heading,
      fontSize: 15,
    },
    floatingBtn: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      // paddingVertical: 10,
    },
    errorMessage: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.danger,
      marginLeft: 20,
    },
    errorContainer: {
      width: '100%',
      paddingVertical: heightToDp(0.1),
      paddingHorizontal: widthToDp(4),
      backgroundColor: colors.red,
      borderBottomLeftRadius: widthToDp(2),
      borderBottomRightRadius: widthToDp(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    errorText: {
      color: colors.white,
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(12),
      paddingLeft: widthToDp(3),
    },
  });

export default makeStyles;
