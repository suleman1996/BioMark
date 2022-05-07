import { StyleSheet } from 'react-native';

import colors from 'assets/colors';

export const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.inputBg,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    height: 44,
    backgroundColor: colors.inputBg,
  },
  datePickerStyle: {
    alignSelf: 'center',
    width: '100%',
  },
});
