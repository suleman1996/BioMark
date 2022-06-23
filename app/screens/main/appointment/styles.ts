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
      height: heightToDp(150),
    },
    badgesContainer: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    horizontalListItem: {
      paddingHorizontal: widthToDp(5),
      alignItems: 'center',
      justifyContent: 'center',
      height: heightToDp(6),
      borderBottomColor: colors.darkPrimary,
    },
    horizontalListItemText: {
      fontFamily: fonts.regular,
      fontSize: responsiveFontSize(20),
    },
    navBar: {
      backgroundColor: colors.blue,
      height: 85,
      width: '100%',
    },
    navHeading: {
      fontFamily: fonts.bold,
      fontSize: 25,
      color: colors.white,
      paddingLeft: 21,
      paddingTop: 5,
      paddingBottom: 10,
    },
    navSearch: {
      width: '100%',
      marginHorizontal: 20,
    },
  });

export default makeStyles;
