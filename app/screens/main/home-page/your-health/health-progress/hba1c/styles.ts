import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';

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
    rowCenter: { flexDirection: 'row', alignItems: 'center' },
  });
export default styles;
