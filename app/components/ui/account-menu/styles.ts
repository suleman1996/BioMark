import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthToDp(92),
      borderRadius: widthToDp(3),
      borderWidth: 0.5,
      borderColor: colors.lightGrey,
    },
    singleItem: {
      width: widthToDp(92),
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: widthToDp(3),
      paddingVertical: widthToDp(3),
      paddingLeft: widthToDp(4),
      alignItems: 'center',
    },
    text: {
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.light,
      fontSize: RFValue(15),
      paddingLeft: widthToDp(3),
    },
    divider: {
      borderBottomWidth: 2,
      borderColor: colors.primary,
      opacity: 0.3,
    },
    secondText: {
      color: colors.primary,
      fontFamily: fonts.mulishRegular,
      paddingRight: widthToDp(2),
    },
    iconWithSecondText: {
      flexDirection: 'row',
    },
  });

export default makeStyles;
