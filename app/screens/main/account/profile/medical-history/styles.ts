import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
      paddingHorizontal: widthToDp(7),
      paddingTop: heightToDp(3),
    },
    label: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      marginTop: heightToDp(3),
    },
    rowContainer: {
      flexDirection: 'row',
      marginTop: heightToDp(2),
      justifyContent: 'space-between',
      marginBottom: heightToDp(0.5),
    },
  });
export default makeStyles;
