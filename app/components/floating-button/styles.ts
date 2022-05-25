import { StyleSheet } from 'react-native';

const styles = () =>
  StyleSheet.create({
    container: {
      height: 50,
      width: 50,
      position: 'absolute',
      bottom: 10,
      right: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });
export default styles;
