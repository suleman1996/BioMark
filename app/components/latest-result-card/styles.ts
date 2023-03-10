import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

const styles = (colors: any) =>
  StyleSheet.create({
    view: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    title: {
      flex: 1,
      fontSize: responsiveFontSize(20),
      marginHorizontal: 8,
      color: colors.heading,
      fontFamily: fonts.OpenSansBold,
    },
    text3: {
      flex: 1,
      fontSize: responsiveFontSize(15),
      marginHorizontal: widthToDp(13),
      color: colors.grey,
    },
    roundView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'lightgrey',
      width: '40%',
      borderRadius: 10,
      justifyContent: 'center',
      marginHorizontal: widthToDp(20),
      marginTop: 10,
      flex: 1,
    },
    round: {
      backgroundColor: 'green',
      borderRadius: 30,
      width: widthToDp(4),
      height: heightToDp(2),
      marginHorizontal: widthToDp(2),
    },
    text4: {
      flex: 1,
      marginHorizontal: 5,
      fontFamily: fonts.OpenSansBold,
    },
    bottomView: {
      backgroundColor: colors.primary,
      height: 5,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    pastResultView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#C9E1F2',
      padding: 4,
      paddingTop: heightToDp(1),
      paddingBottom: heightToDp(1),
      marginHorizontal: widthToDp(2),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.primary,
      marginTop: heightToDp(3),
    },
    text6: {
      flex: 1,
      paddingHorizontal: widthToDp(1),
      fontSize: responsiveFontSize(14),
      color: colors.heading,
    },
    prImage: {
      height: 20,
      width: 20,
      marginHorizontal: widthToDp(0.1),
    },
    pastResultView2: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: heightToDp(2),
      paddingBottom: heightToDp(2),
      marginHorizontal: widthToDp(2),
      borderColor: colors.primary,
    },
    text7: {
      color: colors.heading,
      fontFamily: fonts.OpenSansBold,
      fontSize: responsiveFontSize(18),
    },
    latestResultView: {
      backgroundColor: 'white',
      paddingTop: 5,
      marginTop: 20,
      borderRadius: 10,

      marginBottom: 10,
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    summaryText: {
      flex: 1,
      color: colors.heading,
      fontFamily: fonts.OpenSansBold,
      fontSize: responsiveFontSize(13),
    },
  });
export default styles;
