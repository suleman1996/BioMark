import { StyleSheet } from 'react-native';

import colors from 'assets/colors';
import fonts from 'assets/fonts';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: colors.blue,
    height: 85,
    width: '100%',
  },
  navHeading: {
    fontFamily: fonts.bold,
    fontSize: 25,
    color: colors.whiteColor,
    paddingLeft: 21,
    paddingTop: 5,
    paddingBottom: 10,
  },
  navSearch: {
    width: '100%',
    marginHorizontal: 20,
  },
  navSearchInner: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },

  //Mid Container
  midContainer: {
    width: '100%',
    marginTop: 25,
    paddingHorizontal: 25,
  },

  bnHeading: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.whiteColor,
    marginTop: 10,
    paddingHorizontal: 10,
  },

  bookNowC: {
    width: '100%',
    marginTop: 13,
    alignContent: 'center',
    borderRadius: 10,
  },

  bnInner: {
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  badgesContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  googleFitC: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    borderRadius: 8,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  gfHeading: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.heading,
    marginTop: 15,
  },
  //bottom nav bar
  bottomNavBar: {
    borderWidth: 2,
    height: '12%',
  },
});

export default styles;
