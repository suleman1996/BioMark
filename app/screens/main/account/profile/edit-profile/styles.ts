import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingBottom: 5,
    },
    topBg: {
      width: widthToDp(100),
      height: heightToDp(7),
      position: 'absolute',
      top: 0,
      backgroundColor: colors.primary,
    },
    image: {
      width: widthToDp(25),
      height: widthToDp(25),
      borderRadius: widthToDp(12.5),
    },
    contentContainer: {
      width: widthToDp(92),
      backgroundColor: colors.white,
      flex: 1,
      marginTop: heightToDp(4),
      borderRadius: widthToDp(3),
      alignItems: 'center',
    },
    profileContainer: {
      width: widthToDp(25),
      height: widthToDp(25),
      borderRadius: widthToDp(12.5),
      position: 'absolute',
      top: -heightToDp(3),
      backgroundColor: colors.white,
    },
    name: {
      marginTop: heightToDp(12),
      fontSize: responsiveFontSize(25),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
    },
    menuContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: widthToDp(3),
      marginTop: heightToDp(2),
      marginBottom: heightToDp(3),
    },
    menuOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: heightToDp(1),
    },
    menuTitleAndIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuTitleText: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.light,
      marginLeft: widthToDp(4),
    },
    editView: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: '#3D3D3D90',
      borderRadius: widthToDp(12.5),
      zIndex: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default makeStyles;
