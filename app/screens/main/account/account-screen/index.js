import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import TitleWithSearchBarLayout from '../../../../components/layouts/titleWithSearchBar';
import {
  heightToDp,
  widthToDp,
} from '../../../../utils/functions/responsiveDimentions';
import Images from '../../../../assets/images/images';
import {GlobalFonts} from '../../../../utils/theme/fonts';
import {responsiveFontSize} from '../../../../utils/functions/responsiveText';
import {GlobalColors} from '../../../../utils/theme/globalColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuListItem from '../../../../components/higher-order/menuListItem';
import AccountMenu from '../../../../components/ui/accountMenu';
import { navigate } from '../../../../services/navRef';
import { Nav_Screens } from '../../../../navigation/constants';
const AccountScreen = () => {
  return (
    <>
      <TitleWithSearchBarLayout title={'Account'}>
        <View style={styles.content}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.avatar} style={styles.image} />
            <View style={styles.profile}>
              <Text style={styles.name}>Gerold Mordeno</Text>
              <Pressable
                onPress={() =>
                  navigate(
                    Nav_Screens.NestedAccountNavigator,
                    {screen: Nav_Screens.Edit_Profile},
                  )
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
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
    paddingBottom: heightToDp(20)
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
    marginBottom: heightToDp(7)
  },
});

export default AccountScreen;
