import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    // paddingHorizontal: 15,
  },
  body: {
    flex: 1,
    // backgroundColor: 'red',
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 16,
    marginVertical: 20,
    marginBottom: 10,
  },
  inputLablel: {
    fontFamily: fonts.bold,
    color: colors.heading,
    fontSize: 15,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
  },
  errorMessage: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.danger,
    marginLeft: 10,
  },
});

export default styles;
