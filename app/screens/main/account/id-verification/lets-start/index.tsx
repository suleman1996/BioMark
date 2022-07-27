import {
  Image,
  Pressable,
  Text,
  View,
  NativeModules,
  NativeEventEmitter,
  Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from 'assets/images';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import ButtonComponent from 'components/base/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack, navigate } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { ActivityIndicator } from 'components';
import SCREENS from 'navigation/constants';
import { useNavigation } from '@react-navigation/native';
import { WORK_FLOW_EXECUTION_ID } from 'store/account/constants';
import { useDispatch } from 'react-redux';
import Styles from './styles';
const { JumioMobileSDK } = NativeModules;
const DATACENTER = 'SG';
const LetsStartIdVerfiication = ({ route }: { route: any }) => {
  const sendTo = route?.params?.sendTo;
  const { colors } = useTheme();
  const styles = Styles(colors);
  const dispatch = useDispatch();
  const { ID_VERIFICATION_COMPLETE } = SCREENS;
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');

  const GetJumioData = async () => {
    setIsLoading(true);
    const result = await userService.getJumioData();
    setId(result?.data?.workflowExecution?.id);
    dispatch({
      type: WORK_FLOW_EXECUTION_ID,
      payload: result?.data?.workflowExecution?.id,
    });
    startJumio(result?.data?.sdk?.token);
    setIsLoading(false);
  };

  const startJumio = (authorizationToken) => {
    JumioMobileSDK.initialize(authorizationToken, DATACENTER);
    JumioMobileSDK.start();
  };
  // Callbacks - (Data is displayed as a warning for demo purposes)
  const emitterJumio = new NativeEventEmitter(JumioMobileSDK);
  emitterJumio.addListener('EventResult', async (EventResult) => {
    // setIdVerification({
    //   scan_reference: id,
    //   selected_country: EventResult.credentials[0].selectedCountry,
    //   id_number: EventResult.credentials[0].idNumber,
    //   document_type: EventResult.credentials[0].selectedDocumentType,
    //   t_and_c_status: true,
    // });
    navigation.navigate(ID_VERIFICATION_COMPLETE, {
      scan_reference: id,
      selected_country: EventResult?.credentials[0]?.selectedCountry,
      id_number: EventResult?.credentials[0]?.idNumber,
      document_type: EventResult?.credentials[0]?.selectedDocumentType,
      t_and_c_status: true,
    });

    // let id_verification = {
    //   scan_reference: id,
    //   selected_country: selected_country,
    //   id_number: id_number,
    //   document_type: document_type,
    //   t_and_c_status: t_and_c_status,
    // };
    // const result = await userService.jumioCallBack();
    // navigation.navigate(ID_VERIFICATION_COMPLETE);
  });
  emitterJumio.addListener('EventError', (EventError) => {
    console.log('EventError', EventError);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator visible={isLoading} />
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
        For you to continue, we need to verify your identity.
      </Text>
      <Image source={Images.bioverificationstart} style={styles.image} />
      <View style={{ marginTop: heightToDp(6) }} />
      <ButtonComponent
        onPress={() => {
          GetJumioData();
        }}
        style={{
          width: widthToDp(79.5),
          height: Platform.OS == 'ios' ? heightToDp(5.7) : heightToDp(6.5),
        }}
        title={'Continue'}
      />
      <View style={{ marginTop: heightToDp(2) }} />
      <ButtonComponent
        bg="transparent"
        color={colors.darkGray}
        fontFamily={GlobalFonts.bold}
        fontSize={21}
        style={{ borderWidth: 0 }}
        onPress={() => {
          if (sendTo && sendTo == 'booktest') {
            navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
              screen: SCREENS.BOOKCOVIDTEST,
            });
          } else {
            goBack();
          }
        }}
        title={'Skip for now'}
      />
    </SafeAreaView>
  );
};

export default LetsStartIdVerfiication;
