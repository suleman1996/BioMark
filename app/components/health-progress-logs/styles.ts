import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

const styles = (colors: any) =>
  StyleSheet.create({
    logView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    renderLog: {
      height: 50,
      backgroundColor: colors.white,
      borderRadius: 2,
      borderBottomColor: colors.blueTransparent,
      borderBottomWidth: 2,
      alignItems: 'center',
      paddingHorizontal: 15,
      flexDirection: 'row',
    },
    logsList: {
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      borderWidth: 0.0001,
      borderColor: 'transparent',
      marginHorizontal: 15,
      borderRadius: 2,
      backgroundColor: '#fff',
      marginTop: 5,
      marginBottom: 10,
    },
    showMoreText: {
      fontFamily: fonts.mulishRegular,
      color: colors.heading,
      marginLeft: 10,
      marginTop: 5,
    },
  });
export default styles;
