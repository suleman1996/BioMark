import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';
// import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    content: {
      flex: 1,
      alignItems: 'center',
      paddingTop: heightToDp(5),
      justifyContent: 'center',
      paddingBottom: heightToDp(10),
      backgroundColor: colors.white,
    },
    image: {
      width: widthToDp(25),
      height: widthToDp(25),
      borderRadius: widthToDp(12.5),
    },
    profile: {
      paddingHorizontal: widthToDp(4),
    },
    name: {
      fontFamily: colors.medium,
      fontSize: RFValue(17),
      color: colors.darkPrimary,
      paddingRight: widthToDp(20),
    },
    editProfile: {
      fontFamily: fonts.mulishLight,
      fontSize: RFValue(15),
      color: colors.primary,
      paddingLeft: widthToDp(2),
    },
    menuList: {
      paddingTop: widthToDp(7),
      marginBottom: heightToDp(7),
    },
    accountScreenView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: widthToDp(100),
      paddingHorizontal: widthToDp(6),
    },
  });

export default makeStyles;
