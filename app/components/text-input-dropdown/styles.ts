import { StyleSheet } from 'react-native';

import { heightToDp } from 'utils/functions/responsive-dimensions';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      borderWidth: 0.5,
    },
    dropDownView: {
      width: '85%',
      height: heightToDp(5),
      backgroundColor: colors.white,
      paddingLeft: 10,
      justifyContent: 'center',
    },
    dropdownOptions: {
      borderWidth: 0.5,
      marginHorizontal: 20,
    },
    downBtn: {
      width: '15%',
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      height: heightToDp(5),
      bottom: 0,
    },
  });
export default makeStyles;
