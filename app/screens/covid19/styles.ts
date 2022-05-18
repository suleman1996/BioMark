import { StyleSheet } from 'react-native';

// import fonts from 'assets/fonts';
import { heightToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      height: heightToDp(100),
    },
    badgesContainer: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    horizontalListItem: {},
  });

export default makeStyles;
