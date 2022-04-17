import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';


const styles = StyleSheet.create({
  navBar: {
    // flex:1,
    backgroundColor: colors.blue,
    height: 85,
    width: '100%',
  },
  navHeading: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 25,
    color: colors.whiteColor,
    paddingLeft: 21,
    paddingTop: 5,

  },
  navSearch: {
    flex: 1,
    width: '100%',
    marginHorizontal: 20,
    marginTop: 20,
    
  },
  navSearchInner: {
    // borderWidth:1,
    // borderColor:'red',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    
  },

  //Mid Container
  midContainer: {
    // borderWidth: 1,
    // backgroundColor: 'red',
    // height: '50%',
    // flex: 1,
    width: '100%',
    marginTop: 25,
    paddingHorizontal: 25,

  },

  bnHeading: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.whiteColor,
    marginTop:10,
  },

  bookNowC: {
    // borderWidth: 1,
    // backgroundColor: 'grey',
    // borderRadius: 8,
    // height: 134,
    // justifyContent:'center',
    // flexWrap: 'wrap',
    // paddingHorizontal: 15,
    // paddingTop: 10,
    flex: 1,
    width: '100%',
    marginTop: 13,
    alignContent:'center',
  },
  bnInner: {
    // borderWidth: 1,
    // flex: 1,
    width: '70%',
    marginTop: 5,
    flexDirection: 'row',
  },

  badgesContainer: {
    // borderWidth: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },

  googleFitC: {
    // borderWidth: 1,
    // opacity: .3,
    // position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    borderRadius: 8,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
    marginVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  gfHeading: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.heading,
    marginTop: 15,
  },
  //bottom nav bar
  bottomNavBar: {
    // marginTop:570,
    height: '12%',
  }
});

export default styles;
