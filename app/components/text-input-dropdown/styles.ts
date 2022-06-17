import { StyleSheet } from 'react-native';

import { heightToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    dropDownView: {
      width: '85%',
      height: heightToDp(5),
      backgroundColor: colors.gray,
      paddingLeft: 10,
      justifyContent: 'center',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    dropdownOptions: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
      marginHorizontal: 12,
      height: heightToDp(15),
      backgroundColor: colors.white,
    },
    downBtn: {
      width: '15%',
      backgroundColor: colors.gray,
      alignItems: 'center',
      justifyContent: 'center',
      height: heightToDp(5),
      bottom: 0,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
  });
export default makeStyles;
