import { StyleSheet } from 'react-native';

import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginTop: heightToDp(2),
    },
    label: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
    },
    textFieldStyle: {
      fontSize: responsiveFontSize(40),
      width: '80%',
      color: '#3D3D3D',
      backgroundColor: colors.gray,
      fontFamily: GlobalFonts.bold,
      borderWidth: 0,
      borderBottomWidth: 0,
    },
    rowContainer: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: colors.gray,
      alignItems: 'center',
      borderRadius: widthToDp(2),
    },
    popupMenu: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: widthToDp(25),
    },
    singleMenuItem: {
      width: '100%',
    },
    menuText: {
      fontSize: responsiveFontSize(20),
      padding: widthToDp(2),
    },
  });
export default makeStyles;
