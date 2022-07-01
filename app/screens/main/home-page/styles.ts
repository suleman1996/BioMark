import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
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
    navSearchInner: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
    },

    //Mid Container
    midContainer: {
      width: '100%',
      marginTop: heightToDp(13),
      paddingHorizontal: 25,
      backgroundColor: 'white',
    },

    bnHeading: {
      fontFamily: fonts.bold,
      fontSize: RFValue(18),
      color: colors.white,
      paddingTop: 10,
      paddingHorizontal: 10,
    },

    bookNowC: {
      width: '100%',
      marginTop: 13,
      alignContent: 'center',
    },

    bnInner: {
      width: '100%',
      marginTop: 5,
      paddingHorizontal: 10,
      paddingBottom: 10,
      justifyContent: 'space-around',
      flexDirection: 'row',
    },

    badgesContainer: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    //bottom nav bar
    bottomNavBar: {
      borderWidth: 2,
      height: '12%',
    },
  });

export default makeStyles;
