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
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.heading,
    },
  });
export default styles;
