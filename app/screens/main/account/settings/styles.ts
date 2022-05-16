import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      paddingTop: heightToDp(1),
    },
    menuItem: {
      flexDirection: 'row',
      width: '100%',
      maxWidth: widthToDp(100),
      justifyContent: 'space-between',
      paddingHorizontal: widthToDp(4),
      paddingVertical: heightToDp(2.5),
      alignItems: 'center',
      borderTopWidth: 0.5,
    },
    menuItemText: {
      fontFamily: GlobalFonts.bold,
      fontSize: responsiveFontSize(22),
      color: colors.darkPrimary,
    },
  });
export default makeStyles;
