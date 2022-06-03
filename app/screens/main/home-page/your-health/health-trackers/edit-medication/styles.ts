import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: colors.white,
    },
    checklistView: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      padding: 2,
    },
    textStyle: {
      fontFamily: fonts.mulishRegular,
      fontSize: 17,
    },
    gradientButton: {
      borderTopColor: colors.darkGray,
      justifyContent: 'flex-end',
      position: 'absolute',
      width: '100%',
      bottom: 0,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 0.5,
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
      marginVertical: 8,
      borderRadius: 3,
    },
  });
export default makeStyles;
