import { StyleSheet } from 'react-native';
import colors from 'assets/colors';

import fonts from 'assets/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: GlobalColors.white,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  ripple: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 5,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
  },
});
