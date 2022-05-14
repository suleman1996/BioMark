import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: heightToDp(6),
      backgroundColor: colors.gray,
      flex: 1,
      borderRadius: widthToDp(2),
      maxHeight: heightToDp(6.5),
    },
    errorContainer: {
      width: '100%',
      paddingVertical: heightToDp(0.3),
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
      fontSize: responsiveFontSize(14),
      paddingLeft: widthToDp(3),
    },
  });
export default makeStyles;
