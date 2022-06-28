import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingBottom: heightToDp(25),
    },
    badgesContainer: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    horizontalListItem: {
      paddingHorizontal: widthToDp(6),
      alignItems: 'center',
      justifyContent: 'center',
      height: heightToDp(6),
      borderBottomColor: colors.darkPrimary,
    },
    horizontalListItemText: {
      fontFamily: fonts.regular,
      fontSize: responsiveFontSize(20),
    },
  });

export default makeStyles;
