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
      height: 40,
      backgroundColor: colors.white,
      marginHorizontal: 10,
      borderRadius: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderBottomColor: colors.blue,
      borderBottomWidth: 1,
      alignItems: 'center',
      paddingHorizontal: 5,
      flexDirection: 'row',
    },
  });
export default styles;
