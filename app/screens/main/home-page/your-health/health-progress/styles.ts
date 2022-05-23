import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
  });
export default styles;
