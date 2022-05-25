import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from 'assets/images';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import ButtonComponent from 'components/base/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack } from 'services/nav-ref';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SCREENS from 'navigation/constants';
import { useNavigation } from '@react-navigation/native';

type Props = {};

const LetsStartIdVerfiication = (props: Props) => {
  const { colors } = useTheme();
  const { ID_VERIFICATION_COMPLETE } = SCREENS;
  const navigation = useNavigation();

  const {} = props;
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => goBack()} style={styles.backBtnContainer}>
        <Ionicons
          size={responsiveFontSize(35)}
          name="chevron-back-sharp"
          color={colors.darkPrimary}
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
        color={colors.darkGray}
        fontFamily={GlobalFonts.bold}
        fontSize={22}
        onPress={() => goBack()}
        title={'Skip for now'}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(ID_VERIFICATION_COMPLETE)}
      >
        <Text>Complete</Text>
      </TouchableOpacity>
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
    color: Colors.darkPrimary,
  },
  text2: {
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(22),
    color: Colors.black,
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
    color: Colors.darkPrimary,
  },
});
