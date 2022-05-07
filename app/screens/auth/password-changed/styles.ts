import { StyleSheet } from 'react-native';

import fonts from 'assets/fonts';
import colors from 'assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.bold,
    color: colors.blue,
    fontSize: 18,
  },
});
