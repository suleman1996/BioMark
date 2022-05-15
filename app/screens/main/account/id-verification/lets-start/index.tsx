import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from 'assets/images';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalColors } from 'utils/theme/global-colors';
import ButtonComponent from 'components/base/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack } from 'services/nav-ref';

type Props = {};

const LetsStartIdVerfiication = (props: Props) => {
  const {} = props;
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => goBack()} style={styles.backBtnContainer}>
        <Ionicons
          size={responsiveFontSize(35)}
          name="chevron-back-sharp"
          color={GlobalColors.darkPrimary}
        />
        <Text style={styles.backText}>Back</Text>
      </Pressable>
      <Text style={styles.text1}>ID Verification</Text>
      <Text style={styles.text2}>
        For you to continue we need to verify your identity
      </Text>
      <Image source={Images.bioverificationstart} style={styles.image} />
      <View style={{ marginTop: heightToDp(6) }} />
      <ButtonComponent onPress={undefined} title={'Continue'} />
      <View style={{ marginTop: heightToDp(2) }} />
      <ButtonComponent
        bg="transparent"
        color={GlobalColors.darkGray}
        fontFamily={GlobalFonts.bold}
        fontSize={22}
        onPress={() => goBack()}
        title={'Skip for now'}
      />
    </SafeAreaView>
  );
};

export default LetsStartIdVerfiication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontFamily: GlobalFonts.extraBold,
    fontSize: responsiveFontSize(40),
    color: GlobalColors.darkPrimary,
  },
  text2: {
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(22),
    color: GlobalColors.black,
    paddingHorizontal: widthToDp(10),
    textAlign: 'center',
  },
  image: {
    width: widthToDp(75),
  },
  backBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  backText: {
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(25),
    color: GlobalColors.darkPrimary,
  },
});
