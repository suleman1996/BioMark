import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {widthToDp} from '../../../utils/functions/responsive-dimensions';
import {GlobalColors} from '../../../utils/theme/global-colors';
import {GlobalFonts} from '../../../utils/theme/fonts';
import {responsiveFontSize} from '../../../utils/functions/responsive-text';
import Fontisto from 'react-native-vector-icons/Fontisto';

type Props = {
  Icon?: any;
};

const MenuListItem = ({Icon}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon />
        <Text style={styles.text}>Identify Verification</Text>
      </View>
      <Fontisto
        name="angle-right"
        size={responsiveFontSize(22)}
        color={GlobalColors.darkPrimary}
      />
    </View>
  );
};

export default MenuListItem;

const styles = StyleSheet.create({
  container: {
    width: widthToDp(92),
    flexDirection: 'row',
    alignItems: 'center',
    padding: widthToDp(2),
    borderWidth: 1,
    paddingLeft: widthToDp(4),
    justifyContent: 'space-between',
  },
  text: {
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(20),
    paddingLeft: widthToDp(3),
  },
});
