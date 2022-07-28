/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import React, { useEffect, useContext } from 'react';
import Styles from './styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import Images from 'assets/images';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import ButtonComponent from 'components/base/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import { useNavigation } from '@react-navigation/native';
import AuthContext from 'utils/auth-context';
import { userService } from 'services/user-service/user-service';
import { profileServices } from 'services/profile-services';
type Props = {};

const IdVerfiicationComplete = (props: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigation = useNavigation();
  const data = props.route.params;
  const authContext = useContext(AuthContext);
  const userProfile = async () => {
    try {
      const result = await profileServices.getUserProfile();

      authContext.setUserData(result?.data);
    } catch (error) {}
  };

  useEffect(async () => {
    console.log('THIS IS JUMIO CALLBACK', data);
    const result = await userService.jumioCallBack(data);
    console.log('result', result);

    userProfile();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Pressable onPress={() => goBack()} style={styles.backBtnContainer}>
          <Ionicons
            size={responsiveFontSize(40)}
            name="chevron-back-sharp"
            color={colors.darkPrimary}
          />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.text1}>Complete</Text>
        <Text style={styles.text2}>
          Your details have been verified successfully!
        </Text>
        <Image source={Images.bioverificationcomplete} style={styles.image} />
        <View style={{ marginTop: heightToDp(6) }} />
      </SafeAreaView>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <ButtonComponent
          onPress={() => {
            navigation.navigate(SCREENS.ACCOUNT);
          }}
          title={'Continue'}
        />
      </View>
    </>
  );
};

export default IdVerfiicationComplete;
