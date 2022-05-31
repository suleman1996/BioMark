import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: fonts.light,
      fontSize: 18,
    },
    label: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
      marginHorizontal: 15,
      fontWeight: 'bold',
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
      marginVertical: 8,
      borderRadius: 3,
    },
    radioText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.light,
    },
    textinputView: {
      marginHorizontal: heightToDp(5),
      marginTop: 10,
      borderBottomWidth: 0,
      borderColor: colors.darkPrimary,
    },
    container2: {
      marginHorizontal: heightToDp(5),
      // marginTop:10,
      borderBottomWidth: 0,
      borderColor: colors.darkPrimary,
      backgroundColor: colors.inputBg,
      height: 50,
    },
    bottomView: {
      width: '100%',
      height: 50,
      backgroundColor: colors.redish,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0,
      // borderWidth: 4,
    },
    listview: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      justifyContent: 'space-evenly',
      marginHorizontal: widthToDp(2),
      paddingHorizontal: widthToDp(2),
      height: heightToDp(5),
      // width: widthToDp(5),
      borderRadius: 20,
      borderColor: colors.navyblue,
      borderWidth: 1,
      marginTop: 20,
      flex: 1,
    },
    listTextColor: {
      flex: 1,
      flexDirection: 'row',
      color: colors.darkGray,
    },
    flatlistView: {
      marginHorizontal: 25,
      // marginTop: 10,
      // width: '50%',
    },
    crossIcon: {
      // flex: 1,
    },
    addBtn: {
      width: widthToDp(20),
      height: heightToDp(5),
      borderRadius: widthToDp(5),
      backgroundColor: colors.primary,
      position: 'absolute',
      right: widthToDp(6),
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default makeStyles;
