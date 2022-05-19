import React, { useContext, useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TitleWithSearchBarLayout } from 'components/layouts';
import { AccountMenu } from 'components/ui';
import { ActivityIndicator } from 'components';

import SCREENS from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import AuthContext from 'utils/auth-context';
import { userService } from 'services/user-service/user-service';
import { logNow } from 'utils/functions/log-binder';

import Images from 'assets/images';

import makeStyles from './styles';

const AccountScreen = () => {
  const authContext = useContext(AuthContext);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [profileLoader, setProfileLoader] = React.useState(false);
  const [autoLogoutCheck, setAutoLogoutCheck] = React.useState(false);

  useEffect(() => {
    getAutoLogout();
  }, []);

  const onToggleAutoLogout = async () => {
    setAutoLogoutCheck(!autoLogoutCheck);
    userService
      .saveAutoLogout(!autoLogoutCheck)
      .then(async (res) => {
        console.log('resSave', res);
        setAutoLogoutCheck(res?.auto_logout);
      })
      .catch((e) => {
        logNow('erro', e);
      })
      .finally(() => {});
  };

  const getAutoLogout = async () => {
    userService
      .autoLogout()
      .then(async (res) => {
        console.log('res', res);
        setAutoLogoutCheck(res?.auto_logout);
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
          <View style={styles.accountScreenView}>
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
                  navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
                    screen: SCREENS.EDIT_PROFILE,
                  })
                }
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  size={responsiveFontSize(25)}
                  color={colors.primary}
                />
                <Text style={styles.editProfile}>Edit Profile</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.menuList}>
            <AccountMenu
              logOutCheck={autoLogoutCheck}
              onToggleAutoLogout={onToggleAutoLogout}
              dependentsCount={authContext?.userData?.dependent_count || 0}
            />
          </View>
        </View>
      </TitleWithSearchBarLayout>
    </>
  );
};

export default AccountScreen;
