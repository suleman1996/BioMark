import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react'
import ModalComponent from '../../base/modal'
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions'
import { responsiveFontSize } from '../../../utils/functions/responsiveText'
import { GlobalFonts } from '../../../utils/theme/fonts'
import { GlobalColors } from '../../../utils/theme/globalColors'

const DeleteModalComponent = ({isVisible, setIsVisible}) => {
  return (
    <ModalComponent isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Text style={styles.heading}>Delete Dependant?</Text>
        <Text style={styles.subHeading}>
          Are you sure you want to delete profiles
        </Text>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={() => setIsVisible(false)} style={styles.yesBtn}>
            <Text style={styles.yesBtnText}>Yes</Text>
          </Pressable>
          <Pressable onPress={() => setIsVisible(false)} style={styles.noBtn}>
            <Text style={styles.noBtnText}>No</Text>
          </Pressable>
        </View>
      </View>
    </ModalComponent>
  );
}

export default DeleteModalComponent

const styles = StyleSheet.create({
  container: {
    width: widthToDp(85),
    padding: widthToDp(4),
    borderRadius: widthToDp(3),
    backgroundColor: GlobalColors.white,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: heightToDp(2),
  },
  heading: {
    fontSize: responsiveFontSize(25),
    fontFamily: GlobalFonts.bold,
    color: GlobalColors.red
  },
  subHeading: {
    fontSize: responsiveFontSize(17),
    fontFamily: GlobalFonts.regular,
  },
  yesBtn: {
    paddingHorizontal: widthToDp(8),
    paddingVertical: widthToDp(2),
    borderWidth: 0.5,
    borderRadius: widthToDp(3),
  },
  noBtn: {
    paddingHorizontal: widthToDp(8),
    paddingVertical: widthToDp(2),
    backgroundColor: GlobalColors.primary,
    borderRadius: widthToDp(3),
  },
  yesBtnText: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.regular,
    color: GlobalColors.red
  },
  noBtnText: {
    fontSize: responsiveFontSize(18),
    fontFamily: GlobalFonts.regular,
    color: GlobalColors.white
  },
});