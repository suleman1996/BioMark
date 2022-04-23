import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, { useState } from 'react';
import {TouchableRipple } from 'react-native-paper'
import {widthToDp} from '../../../utils/functions/responsiveDimentions';
import {GlobalColors} from '../../../utils/theme/globalColors';
import {GlobalFonts} from '../../../utils/theme/fonts';
import {responsiveFontSize} from '../../../utils/functions/responsiveText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import FontAwesome2 from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Nav_Screens } from '../../../navigation/constants';
import {navigate} from '../../../services/navRef'
import { GlobalStyles } from '../../../utils/theme/globalStyles';
import { Switch } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/auth/authActions';

const AccountMenu = ({}) => {
  const dispatch = useDispatch();


  const [isAutoLogout, setIsAutoLogout] = useState(false);
  const onToggleAutoLogout = () => {
    setIsAutoLogout(!isAutoLogout);
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.singleItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="credit-card-outline"
            size={responsiveFontSize(18)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.text}>Identify Verification </Text>
        </View>
        <View style={styles.iconWithSecondText}>
          <Text style={styles.secondText}>Not Verified</Text>
          <Fontisto
            name="angle-right"
            size={responsiveFontSize(22)}
            color={GlobalColors.darkPrimary}
          />
        </View>
      </Pressable>
      {/* divider */}
      <View style={styles.divider} />
      <Pressable
        onPress={() =>
          navigate(Nav_Screens.NestedAccountNavigator, {
            screen: Nav_Screens.Dependants_Screen,
          })
        }
        style={styles.singleItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome
            name="user-friends"
            size={responsiveFontSize(18)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.text}>Dependants</Text>
        </View>
        <View style={styles.iconWithSecondText}>
          <Text style={styles.secondText}>7 Users</Text>
          <Fontisto
            name="angle-right"
            size={responsiveFontSize(22)}
            color={GlobalColors.darkPrimary}
          />
        </View>
      </Pressable>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        onPress={() =>
          navigate(Nav_Screens.NestedAccountNavigator, {
            screen: Nav_Screens.Settings,
          })
        }
        style={styles.singleItem}>
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Fontisto
              name="player-settings"
              size={responsiveFontSize(22)}
              color={GlobalColors.darkPrimary}
            />
            <Text style={styles.text}>Settings</Text>
          </View>
          <Fontisto
            name="angle-right"
            size={responsiveFontSize(22)}
            color={GlobalColors.darkPrimary}
          />
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <Pressable style={styles.singleItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome2
            name="bell"
            size={responsiveFontSize(22)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.text}>Notifications</Text>
        </View>
        <Fontisto
          name="angle-right"
          size={responsiveFontSize(22)}
          color={GlobalColors.darkPrimary}
        />
      </Pressable>
      {/* divider */}
      <View style={styles.divider} />
      <Pressable style={styles.singleItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome2
            name="support"
            size={responsiveFontSize(22)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.text}>Support</Text>
        </View>
        <Fontisto
          name="angle-right"
          size={responsiveFontSize(22)}
          color={GlobalColors.darkPrimary}
        />
      </Pressable>
      {/* divider */}
      <View style={styles.divider} />
      <Pressable style={styles.singleItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="self-improvement"
            size={responsiveFontSize(22)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.text}>About BioMark</Text>
        </View>
        <Fontisto
          name="angle-right"
          size={responsiveFontSize(22)}
          color={GlobalColors.darkPrimary}
        />
      </Pressable>
      {/* divider */}
      <View style={styles.divider} />
      <Pressable style={styles.singleItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome
            name="book"
            size={responsiveFontSize(22)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.text}>Policies</Text>
        </View>
        <Fontisto
          name="angle-right"
          size={responsiveFontSize(22)}
          color={GlobalColors.darkPrimary}
        />
      </Pressable>
      {/* divider */}
      <View style={styles.divider} />
      <Pressable onPress={() => dispatch(logout())} style={styles.singleItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="logout"
            size={responsiveFontSize(22)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.text}>Logout</Text>
        </View>
      </Pressable>
      {/* divider */}
      <View style={styles.divider} />
      <Pressable style={styles.singleItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Entypo
            name="back-in-time"
            size={responsiveFontSize(22)}
            color={GlobalColors.darkPrimary}
          />
          <Text style={styles.text}>Auto Logout</Text>
        </View>
        <Switch
          color={GlobalColors.darkPrimary}
          value={isAutoLogout}
          onValueChange={onToggleAutoLogout}
        />
      </Pressable>
    </View>
  );
};

export default AccountMenu;

const styles = StyleSheet.create({
  container: {
    width: widthToDp(92),
    borderRadius: widthToDp(3),
    ...GlobalStyles.shadow
  },
  singleItem: {
    width: widthToDp(92),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: widthToDp(3),
    paddingVertical: widthToDp(3),
    paddingLeft: widthToDp(4),
    alignItems: 'center',
  },
  text: {
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.light,
    fontSize: responsiveFontSize(20),
    paddingLeft: widthToDp(3),
  },
  divider: {
    borderBottomWidth: 2,
    borderColor: GlobalColors.primary,
    opacity: 0.3,
  },
  secondText: {
    color: GlobalColors.primary,
    fontFamily: GlobalFonts.light,
    paddingRight: widthToDp(2),
  },
  iconWithSecondText: {
    flexDirection: 'row',
  }
});
