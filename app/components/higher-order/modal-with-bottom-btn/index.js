import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import ModalComponent from '../../base/modal';
import ButtonWithShadowContainer from '../../base/button-with-shadow-container';
import {
  heightToDp,
  widthToDp,
} from '../../../utils/functions/responsiveDimentions';
import {GlobalColors} from '../../../utils/theme/globalColors';
import {responsiveFontSize} from '../../../utils/functions/responsiveText';
import {GlobalFonts} from '../../../utils/theme/fonts';

const ModalWithBottomBtn = ({isVisible, children, onPress, title}) => {
  const [isModal, setIsModal] = useState(isVisible);

  useEffect(() => {
    setIsModal(isVisible);
  }, [isVisible]);
  return (
    <ModalComponent isVisible={isModal}>
      <View style={styles.card}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <Text style={styles.title}>{title}</Text>
          {children}
        </ScrollView>
        <ButtonWithShadowContainer
          title="Save"
          onPress={() => {
                    setIsModal(false);
                    onPress();
          }}
        />
      </View>
    </ModalComponent>
  );
};

export default ModalWithBottomBtn;

const styles = StyleSheet.create({
  card: {
    width: widthToDp(90),
    height: heightToDp(85),
    backgroundColor: GlobalColors.white,
    borderRadius: widthToDp(3),
  },
  title: {
    fontSize: responsiveFontSize(27),
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.medium,
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2),
  },
});
