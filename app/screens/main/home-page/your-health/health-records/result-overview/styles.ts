import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
// import { responsiveFontSize } from 'utils/functions/responsive-text';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    miniHeader: {
      height: '6%',
      backgroundColor: colors.blue,
      paddingHorizontal: 15,
    },
    miniHeaderText: {
      color: colors.white,
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    summaryContainer: {
      // height: 200,
      width: '100%',
      backgroundColor: colors.white,
      marginTop: 20,
      padding: 10,
      borderRadius: 5,

      borderBottomColor: colors.blue,
      borderBottomWidth: 8,
      minHeight: 80,
    },
    renderTitle: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.heading,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    infoView: {
      height: 40,
      width: '100%',
      backgroundColor: colors.lightBlue,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      marginVertical: 10,
    },
    infoText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.bg,
      marginLeft: 10,
    },
  });
export default styles;
