import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import ModalComponent from 'components/base/modal';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import ButtonComponent from 'components/base/button';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
  callMe: any;
};

const MarketingConsentModal = (props: Props) => {
  const { isVisible, setIsVisible, callMe } = props;
  return (
    <ModalComponent isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Are You Sure?</Text>
          <Pressable onPress={() => setIsVisible(false)}>
            <Entypo size={responsiveFontSize(32)} name="cross" />
          </Pressable>
        </View>
        <Text style={styles.contentText}>
          By clicking 'Confirm' you will not receive any more offers, promotion
          and services via email and SMS.
        </Text>
        <ButtonComponent
          onPress={() => callMe()}
          title={'Confirm'}
          disabled={false}
        />
        <ButtonComponent
          bg={'transparent'}
          color={'gray'}
          onPress={() => setIsVisible(false)}
          title={'Not Now'}
          disabled={false}
        />
      </View>
    </ModalComponent>
  );
};

export default MarketingConsentModal;

const styles = StyleSheet.create({
  container: {
    width: widthToDp(92),
    backgroundColor: GlobalColors.white,
    borderRadius: widthToDp(3),

    paddingHorizontal: widthToDp(4),
    paddingVertical: heightToDp(2),
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: GlobalFonts.medium,
    fontSize: responsiveFontSize(25),
    color: GlobalColors.darkPrimary,
  },
  contentText: {
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(20),
    color: 'gray',
    lineHeight: responsiveFontSize(30),
    marginTop: heightToDp(3),
    marginBottom: heightToDp(3),
  },
});