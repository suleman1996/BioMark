import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    popUpHeader: {
      width: '100%',
      height: 40,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    popUpHeading: {
      fontFamily: fonts.bold,
      fontSize: 21,
      color: colors.heading,
    },
    popUpSubHeading: {
      fontFamily: fonts.extraBold,
      fontSize: 15,
      color: colors.heading,
    },
    singleMenuItem: {
      paddingHorizontal: widthToDp(4),
      paddingVertical: widthToDp(2.5),
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      borderBottomColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
    },

    errorMessage: {
      marginHorizontal: 5,
      fontSize: 12,
      color: colors.danger,
    },
  });
export default makeStyles;
