import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    flatlistView: {
      backgroundColor: colors.white,
      marginHorizontal: widthToDp(5),
      borderRadius: 10,
      marginBottom: 10,
      elevation: 3,
    },
    flatlisttext: {
      color: colors.black,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    flatlistImage: {
      height: heightToDp(2),
      width: widthToDp(4),
    },
    flatlistView2: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: widthToDp(3),
      marginTop: heightToDp(2),
    },
    flatlisttext2: {
      color: colors.heading,
      marginHorizontal: widthToDp(8),
      marginBottom: 10,
      marginTop: heightToDp(1),
    },
    text4: {
      color: colors.navyblue,
      marginHorizontal: widthToDp(5),
      fontSize: responsiveFontSize('20'),
      fontWeight: 'bold',
    },
    text5: {
      color: colors.heading,
      marginTop: heightToDp(2),
      marginHorizontal: widthToDp(5),
      fontSize: responsiveFontSize('15'),
      paddingBottom: 30,
      fontFamily: fonts.OpenSansRegular,
    },
    text6: {
      color: colors.smoke,
      marginHorizontal: widthToDp(5),
      marginTop: heightToDp(2),
      fontSize: responsiveFontSize('13'),
      fontWeight: 'bold',
    },
    text7: {
      color: colors.smoke,
      marginHorizontal: widthToDp(5),
      fontSize: responsiveFontSize('13'),
      marginBottom: 1,
    },
  });
export default makeStyles;
