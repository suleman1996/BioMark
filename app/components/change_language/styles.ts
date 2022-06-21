import { StyleSheet } from 'react-native';

import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    languageIcon: {
      color: colors.white,
      fontFamily: fonts.mulishBold,
      fontSize: 20,
    },
    leftIconView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionIcon: {
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.primary,
    },
    optionsHeading: {
      color: colors.black,
      fontSize: 15,
      fontFamily: fonts.mulishExtraBold,
    },
    input: {
      width: widthToDp(70),
      fontSize: responsiveFontSize(20),
      color: '#3D3D3D',
      marginHorizontal: 10,
      fontFamily: fonts.mulishRegular,
    },
    popupMenu: {
      borderRadius: 8,
      flex: 1,
      width: widthToDp(45),
      marginLeft: 15,
      marginTop: 35,
    },
    singleMenuItem: {
      paddingVertical: widthToDp(2),
      borderBottomWidth: 0.7,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      borderBottomColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuText: {
      paddingLeft: widthToDp(3),
      fontFamily: fonts.mulishRegular,
      color: '#8493AE',
      fontSize: 15,
    },
  });
export default makeStyles;
