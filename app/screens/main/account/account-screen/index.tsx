import React, { useContext, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from 'assets/images';
import { TitleWithSearchBarLayout } from 'components/layouts';
import { AccountMenu } from 'components/ui';
import { Nav_Screens } from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import AuthContext from 'utils/auth-context';
import { ActivityIndicator } from 'components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userService } from 'services/user-service/user-service';
import { logNow } from 'utils/functions/log-binder';

const AccountScreen = () => {
  const authContext = useContext(AuthContext);

  const [profileLoader, setProfileLoader] = React.useState(false);
  const [autoLogoutCheck, setAutoLogoutCheck] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let logoutCheck = await AsyncStorage.getItem('autoLogoutCheck');
      setAutoLogoutCheck(logoutCheck);
    };
    fetchData().catch(console.error);
  }, []);

  const onToggleAutoLogout = async () => {
    await autoLogout();
  };
  const autoLogout = async () => {
    userService
      .autoLogout()
      .then(async (res) => {
        logNow('signup res', res);
        setAutoLogoutCheck(res?.auto_logout);
        await AsyncStorage.setItem(
          'autoLogoutCheck',
          JSON.stringify(res?.auto_logout)
        );
      })
      .catch((e) => {
        logNow('erro', e);
      })
      .finally(() => {});
  };
  return (
    <>
      <TitleWithSearchBarLayout title={'Account'}>
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: widthToDp(100),
              paddingHorizontal: widthToDp(6),
            }}
          >
            <View style={[styles.image, { overflow: 'hidden' }]}>
              <Image
                onLoadStart={() => setProfileLoader(true)}
                onLoadEnd={() => setProfileLoader(false)}
                source={
                  !authContext?.userData?.picture
                    ? Images.avatar
                    : { uri: authContext?.userData?.picture }
                }
                style={styles.image}
              />
              <ActivityIndicator fontSize={20} visible={profileLoader} />
            </View>
            <View style={styles.profile}>
              <Text style={styles.name}>
                {authContext?.userData?.patient_name}
              </Text>
              <Pressable
                onPress={() =>
                  navigate(Nav_Screens.NestedAccountNavigator, {
                    screen: Nav_Screens.EditProfile,
                  })
                }
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  size={responsiveFontSize(25)}
                  color={GlobalColors.primary}
                />
                <Text style={styles.editProfile}>Edit Profile</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.menuList}>
            <AccountMenu
              logOutCheck={autoLogoutCheck}
              onToggleAutoLogout={onToggleAutoLogout}
            />
          </View>
        </View>
      </TitleWithSearchBarLayout>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: heightToDp(5),
    justifyContent: 'center',
    paddingBottom: heightToDp(10),
    backgroundColor: GlobalColors.white,
  },
  image: {
    width: widthToDp(25),
    height: widthToDp(25),
    borderRadius: widthToDp(12.5),
  },
  profile: {
    paddingLeft: widthToDp(4),
  },
  name: {
    fontFamily: GlobalFonts.medium,
    fontSize: responsiveFontSize(22),
    color: GlobalColors.darkPrimary,
  },
  editProfile: {
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(21),
    color: GlobalColors.primary,
    paddingLeft: widthToDp(2),
  },
  menuList: {
    paddingTop: widthToDp(7),
    marginBottom: heightToDp(7),
  },
});

export default AccountScreen;
