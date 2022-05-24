import { StyleSheet } from 'react-native';

import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginTop: heightToDp(2),
    },
    label: {
      fontSize: responsiveFontSize(22),
      fontFamily: fonts.mulishExtraBold,
      color: colors.shineBlue,
      marginBottom: 10,
    },
    textFieldStyle: {
      fontSize: responsiveFontSize(25),
      width: '80%',
      color: colors.blue,
      backgroundColor: colors.fieldGrey,
      fontFamily: GlobalFonts.bold,
      borderWidth: 0,
      borderBottomWidth: 0,
      borderRadius: 8,
    },
    rowContainer: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: colors.fieldGrey,
      alignItems: 'center',
      borderRadius: widthToDp(2),
    },
    popupMenu: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: widthToDp(25),
    },
    singleMenuItem: {
      width: '100%',
      // borderWidth: 1,
    },
    menuText: {
      fontSize: responsiveFontSize(25),
      //   padding: widthToDp(2),
    },
  });
export default makeStyles;
