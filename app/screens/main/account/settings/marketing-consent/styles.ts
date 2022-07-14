import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: widthToDp(8),
      paddingRight: widthToDp(5),
      paddingTop: heightToDp(2),
      backgroundColor: colors.white,
    },
    headerText: {
      fontSize: responsiveFontSize(19),
      fontFamily: GlobalFonts.light,
      color: colors.darkPrimary,
      // letterSpacing: -0.1,
      lineHeight: heightToDp(3.2),
    },
    checkbox: {
      transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
    },
    checkBoxView: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginTop: 10,
    },
    checkTextStyle: {
      fontFamily: fonts.mulishRegular,
      color: colors.lightGrey,
      fontSize: 17,
      lineHeight: 22,
      marginHorizontal: widthToDp(4),
    },
    bottomBtnContainer: {
      position: 'absolute',
      bottom: 20,
      width: widthToDp(100),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: widthToDp(4),
    },
    tcText: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
export default makeStyles;
