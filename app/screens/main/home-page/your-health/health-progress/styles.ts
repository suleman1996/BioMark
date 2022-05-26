import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: colors.white,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      padding: 10,
    },
    navBar: {
      backgroundColor: colors.blue,
      height: 85,
      width: '100%',
    },
    navHeading: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.white,
      paddingLeft: 21,
      paddingTop: 10,
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
    containerBody: { flex: 1, paddingHorizontal: 15, paddingTop: 40 },
    headingText: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.heading,
    },
    horizontalListItem: {
      paddingHorizontal: widthToDp(4),
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: colors.darkPrimary,
    },
    horizontalListItemText: {
      fontFamily: fonts.regular,
      fontSize: responsiveFontSize(17),
    },
  });
export default styles;
