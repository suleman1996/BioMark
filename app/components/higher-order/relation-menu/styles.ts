import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      flex: 1,
      marginTop: heightToDp(2),
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
    },
    label: {
      fontSize: responsiveFontSize(18),
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.medium,
    },
    input: {
      backgroundColor: colors.inputBg,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
    },
    popupMenu: {
      width: widthToDp(70),
    },
  });
export default makeStyles;
