import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headingView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      marginHorizontal: 10,
    },
    heading: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.heading,
    },
    loaderContainer: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.transparentWhite,
    },
  });
export default styles;
