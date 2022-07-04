import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthToDp(40),
      height: heightToDp(7),
      marginTop: heightToDp(1.5),
      backgroundColor: colors.white,
      borderRadius: widthToDp(1),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    label: {
      fontSize: responsiveFontSize(16),
      fontFamily: GlobalFonts.regular,
      color: colors.gray,
    },
  });
export default makeStyles;
