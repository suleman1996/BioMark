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
    sys: {
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    dash: {
      height: 3,
      borderWidth: 1.3,
      borderColor: colors.blue,
      width: 20,
      borderRadius: 2,
      marginRight: 5,
    },
  });
export default styles;
