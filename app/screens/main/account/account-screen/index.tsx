import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from 'assets/images';
import TitleWithSearchBarLayout from 'components/layouts/title-with-search-bar/index';
import AccountMenu from 'components/ui/account-menu';
import { Nav_Screens } from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import AuthContext from 'utils/auth-context';

const AccountScreen = () => {
  const authContext = useContext(AuthContext);

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
            <Image source={Images.avatar} style={styles.image} />
            <View style={styles.profile}>
              <Text style={styles.name}>
                {authContext?.userData?.patient_name}
              </Text>
              <Pressable
                onPress={() =>
                  navigate(Nav_Screens.NestedAccountNavigator, {
                    screen: Nav_Screens.Edit_Profile,
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
            <AccountMenu />
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
