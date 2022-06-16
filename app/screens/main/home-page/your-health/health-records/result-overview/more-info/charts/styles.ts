import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

// import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.white,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 10,
    },
    headingChart: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.greenDark,
      marginVertical: 5,
    },
  });
export default styles;
