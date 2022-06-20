import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    outerTarget: {
      // borderWidth: 0.7,
      // borderColor: colors.darkGray,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.41,

      elevation: 3,
      borderRadius: 8,
      marginVertical: 10,
    },
    targetsContainer: {
      paddingHorizontal: 15,
      borderColor: colors.darkGray,
      paddingVertical: 15,
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    targetText: {
      fontFamily: fonts.mulishRegular,
      fontSize: 17,
      alignSelf: 'flex-end',
    },
    targetLabel: {
      fontFamily: fonts.mulishBold,
      fontSize: 17,
    },
    TabContainer: {
      width: '100%',
      borderWidth: 2,
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderColor: colors.gray,
      borderRadius: widthToDp(4),
      flex: 1,
      minHeight: heightToDp(70),
    },
    yourTargetsHeading: {
      fontFamily: fonts.mulishBold,
      fontSize: 20,
      color: colors.darkPrimary,
    },
  });
export default makeStyles;
