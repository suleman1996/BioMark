import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
      paddingHorizontal: widthToDp(4),
    },
    label: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.light,
    },
    overLay: {
      position: 'absolute',
      backgroundColor: '#3D3D3D90',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
  });
export default makeStyles;
