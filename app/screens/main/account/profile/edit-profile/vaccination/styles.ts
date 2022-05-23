import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp } from 'utils/functions/responsive-dimensions';
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
      backgroundColor: colors.white,
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 5,
      paddingHorizontal: 5,
      maxWidth: '33%',
      height: heightToDp(4),
      marginTop: 10,
      borderRadius: 20,
      borderColor: colors.navyblue,
      borderWidth: 1,
      flex: 9,
    },
    listTextColor: {
      flex: 2,
      color: colors.darkGray,
      fontSize: responsiveFontSize(12),
      marginHorizontal: 5,
    },
    flatlistView: {
      marginHorizontal: 25,
      marginTop: 25,
    },
    crossIcon: {
      // marginHorizontal: 2,
    },
  });
export default makeStyles;
