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
    rangesView: { flexDirection: 'row' },
    rangesTitleView: {
      paddingHorizontal: 15,
      borderRadius: 12,
      paddingVertical: 0.5,
    },
    rangesTitle: {
      fontFamily: fonts.regular,
      color: colors.white,
      fontSize: 11,
    },
    leftView: {
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerView: { width: '25%', paddingLeft: 15 },
    referanceStatus: { fontFamily: fonts.bold, color: colors.heading },
    rightView: {
      width: '55%',
      alignItems: 'flex-end',

      paddingRight: 15,
    },
    referanceValue: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.bg,
    },
  });
export default styles;
