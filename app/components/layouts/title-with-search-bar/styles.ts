import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthToDp(100),
    },
    titleBar: {
      backgroundColor: colors.primary,
      paddingVertical: heightToDp(1.1),
      paddingHorizontal: widthToDp(4),
    },
    textStyle: {
      color: colors.white,
      fontSize: responsiveFontSize(30),
      fontFamily: GlobalFonts.bold,
    },
    searchBarContainer: {
      alignItems: 'center',
      backgroundColor: colors.white,
      paddingBottom: heightToDp(0.5),
    },
    halfPrimary: {
      height: heightToDp(3),
      width: '100%',
      backgroundColor: colors.primary,
      position: 'absolute',
      top: 0,
    },
  });
export default makeStyles;
