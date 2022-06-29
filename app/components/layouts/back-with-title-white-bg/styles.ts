import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalStyles } from 'utils/theme/global-styles';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    header: {
      width: widthToDp(100),
      backgroundColor: colors.white,
      paddingHorizontal: widthToDp(4),
      paddingTop: heightToDp(2.5),
      paddingBottom: heightToDp(2),
      ...GlobalStyles(colors).shadow,
      borderBottomWidth: heightToDp(0.1),
      borderColor: colors.gray,
    },
    titleContainer: {
      paddingVertical: heightToDp(1),
    },
    textStyle: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.medium,
      marginTop: heightToDp(2),
      color: colors.darkPrimary,
    },
  });
export default makeStyles;
