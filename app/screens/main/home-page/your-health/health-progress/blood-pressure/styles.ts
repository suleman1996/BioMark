import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

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
      fontSize: RFValue(17),
      color: colors.heading,
    },
    rowCenter: { flexDirection: 'row', alignItems: 'center' },
    sys: {
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    dash: {
      height: 4,
      borderWidth: 1.8,
      borderColor: colors.greenDark,
      width: 20,
      borderRadius: 2,
      marginRight: 5,
    },
  });
export default styles;
