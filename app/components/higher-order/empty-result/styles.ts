import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.semiBold,
      color: colors.darkPrimary,
      fontSize: RFValue(20),
      paddingTop: heightToDp(2),
    },
    subTitle: {
      fontFamily: fonts.light,
      color: colors.black,
      fontSize: RFValue(15),
      textAlign: 'center',
    },
  });
export default makeStyles;
