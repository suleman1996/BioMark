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
      backgroundColor: colors.white,

      height: 50,
      width: '100%',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.24,
      shadowRadius: 4,
      elevation: 2,
      flexDirection: 'row',
      paddingLeft: 20,
      alignItems: 'center',
    },
    navHeading: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: '#054E8B',
      paddingLeft: 21,
      paddingTop: 10,
      paddingBottom: 10,
    },
  });

export default makeStyles;
