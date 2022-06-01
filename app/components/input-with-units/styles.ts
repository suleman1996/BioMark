/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { widthToDp, heightToDp } from 'utils/functions/responsive-dimensions';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    mainView: {
      height: heightToDp(18),
      backgroundColor: colors.gray,
      marginTop: heightToDp(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderRadius: 10,
    },
    textInput: {
      flexDirection: 'row-reverse',
      width: '70%',
      backgroundColor: 'transparent',
      fontSize: responsiveFontSize(30),
    },
    menuTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: widthToDp(5),
    },
    menuText: {
      color: colors.heading,
      fontSize: responsiveFontSize(22),
      fontFamily: fonts.OpenSansBold,
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
