import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import colors from '../../assets/colors';
import fonts from '../../assets/fonts';
import Button from '../button/button';

type Props = {
  onPress: any;
  visible: boolean;
};

export default function ErrorModal({visible = false, onPress}: Props) {
  if (!visible) return null;
  return (
    <View style={styles.overLay}>
      <View style={styles.view}>
        <Text style={styles.heading}>Please try again</Text>
        <Text style={styles.text}>
          The information provided does not match our records. Kindly check and
          try again. If this is your first time with us, please sign up. Thank
          you.
        </Text>
        <View style={{marginTop: 20}}>
          <Button
            onPress={onPress}
            marginHorizontal={10}
            marginVertical={10}
            title="Ok"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overLay: {
    position: 'absolute',
    backgroundColor: '#3D3D3D90',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  view: {
    // height: 50,
    width: '90%',
    backgroundColor: colors.whiteColor,
    borderRadius: 5,
    padding: 20,
    paddingBottom: 10,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'center',
    color: colors.placeHolder,
  },
  heading: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.blue,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
