import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions'
import { GlobalColors } from '../../../utils/theme/globalColors'
import { responsiveFontSize } from '../../../utils/functions/responsiveText'
import { GlobalFonts } from '../../../utils/theme/fonts'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalButtonComponent = ({title, setIsModal, isModal}) => {

  const textColor = isModal ? {color: GlobalColors.white} : {color: GlobalColors.black};
  const bgColor = isModal ? {backgroundColor: GlobalColors.darkPrimary} : {backgroundColor: GlobalColors.white}
  return (
    <Pressable
      onPress={() => {
        setIsModal(!isModal);
      }}
      style={[styles.container, bgColor]}>
      <Text numberOfLines={1} style={[styles.label, textColor]}>{title}</Text>
      <MaterialCommunityIcons
        size={responsiveFontSize(20)}
        name="chevron-down"
        color={isModal ? GlobalColors.white : GlobalColors.black}
      />
    </Pressable>
  );
}

export default ModalButtonComponent

const styles = StyleSheet.create({
  container: {
    width: widthToDp(44),
    height: heightToDp(8),
    backgroundColor: GlobalColors.white,
    borderRadius: widthToDp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
            fontSize: responsiveFontSize(18),
            fontFamily: GlobalFonts.regular
  }
});