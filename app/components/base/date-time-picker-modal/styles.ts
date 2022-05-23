import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderBottomColor: colors.inputBg,
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: widthToDp(3),
      height: heightToDp(6),
      backgroundColor: colors.inputBg,
      width: '100%',
    },
    textContainer: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: widthToDp(3),
    },
    dateText: {
      fontFamily: GlobalFonts.light,
      color: colors.black,
      fontSize: responsiveFontSize(18),
      flex: 1,
    },
    verticalLine: {
      height: heightToDp(4),
      borderLeftColor: colors.darkGray,
      width: widthToDp(1),
    },
  });
export default makeStyles;
