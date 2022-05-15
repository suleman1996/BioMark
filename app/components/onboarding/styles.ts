import { StyleSheet } from 'react-native';

import colors from 'assets/colors';
import fonts from 'assets/fonts';

export const styles = StyleSheet.create({
  OIcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  cards: {
    backgroundColor: colors.whiteColor,
    // marginVertical: 50,
    height: '80%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 4,
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.heading,
    fontSize: 25,
    textAlign: 'center',
  },
  description: {
    fontFamily: fonts.mulishRegular,
    fontSize: 15,
    color: colors.black,
    textAlign: 'center',
    marginHorizontal: 30,
  },

  OBcontainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  buttonView: {
    width: '100%',
    alignItems: 'center',
  },
});
