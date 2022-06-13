import { StyleSheet } from 'react-native';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },

    input: {
      height: 40,
      //   margin: 12,
      padding: 10,
      backgroundColor: colors.inputBg,
      flex: 1,
    },
    inputView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBg,
      borderRadius: 5,
      overflow: 'hidden',
    },
    searchView: {
      width: '100%',
      backgroundColor: colors.white,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      padding: 10,
      paddingVertical: 15,
    },
    renderSearchView: {
      backgroundColor: colors.white,
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
      justifyContent: 'center',
      margin: 4,
    },
  });
export default styles;
