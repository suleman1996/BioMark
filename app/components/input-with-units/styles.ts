/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { widthToDp, heightToDp } from 'utils/functions/responsive-dimensions';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any, small?: boolean) =>
  StyleSheet.create({
    mainView: {
      height: heightToDp(small ? 5 : 18),
      backgroundColor: small ? colors.inputBg : colors.fieldGrey, //input bg is not accurate
      marginTop: heightToDp(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderRadius: small ? 8 : 5,
    },
    textInput: {
      flexDirection: 'row-reverse',
      ...(small && { flex: 1, paddingHorizontal: 15 }),
      backgroundColor: 'transparent',
      fontSize: responsiveFontSize(small ? 20 : 50),
      fontFamily: small ? fonts.mulishRegular : fonts.OpenSansBold,
      color: small ? colors.black : '#808080',
    },
    menuTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: widthToDp(5),
    },
    menuText: {
      color: small ? colors.lightGrey : colors.heading,
      fontSize: responsiveFontSize(small ? 18 : 22),
      fontFamily: small ? fonts.OpenSansSemiBold : fonts.OpenSansBold,
      ...(small && { marginRight: 10 }),
    },
    optionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: widthToDp(25),
    },
    unit: {
      color: 'black',
      fontSize: responsiveFontSize(20),
      padding: widthToDp(2),
    },
    title: {
      fontSize: responsiveFontSize(20),
      fontFamily: fonts.OpenSansBold,
      color: colors.heading,
      marginTop: heightToDp(2),
      marginHorizontal: 10,
    },
  });
export default makeStyles;
