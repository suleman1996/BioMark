import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 10,
      borderRadius: 5,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    leftView: {
      justifyContent: 'center',
      width: '90%',
    },
    rightView: {
      justifyContent: 'center',
      width: '10%',
    },
    question: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.white,
    },
    descriptionView: {
      padding: 10,
    },
    descriptionText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.bg,
    },
  });
export default styles;
