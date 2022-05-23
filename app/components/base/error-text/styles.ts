import { StyleSheet } from 'react-native';

import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginTop: heightToDp(1),
    },
    errorMessage: {
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(15),
      color: colors.danger,
    },
  });
export default makeStyles;
