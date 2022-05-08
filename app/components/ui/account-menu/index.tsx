import React from 'react';
import { Linking, Text, View } from 'react-native';

import Config from 'react-native-config';
import { Switch, TouchableRipple } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch } from 'react-redux';

import {
  BioAboutIcon,
  BioAutoLogout,
  BioDependent,
  BioIdentify,
  BioLogout,
  BioNotification,
  BioPolicies,
  BioSupport,
  BioSettings,
} from 'components/svg';

import SCREENS from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { logout } from 'store/auth/auth-actions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalColors } from 'utils/theme/global-colors';

import styles from './styles';

const AccountMenu = (props) => {
  const dispatch = useDispatch();

  const OpenMessenger = () => {
    Linking.openURL(Config.MESSENGER_URL);
  };

  return (
    <View style={styles.container}>
      <TouchableRipple style={styles.singleItem}>
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioIdentify width={5} height={3} />
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
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        onPress={() =>
          navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
            screen: SCREENS.DEPENDANTS,
          })
        }
        style={styles.singleItem}
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioDependent width={5} height={5} />
            <Text style={styles.text}>Dependants</Text>
          </View>
          <View style={styles.iconWithSecondText}>
            {/* <Text style={styles.secondText}>7 Users</Text> */}
            <Fontisto
              name="angle-right"
              size={responsiveFontSize(22)}
              color={GlobalColors.darkPrimary}
            />
          </View>
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        onPress={() =>
          navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
            screen: SCREENS.SETTINGS,
          })
        }
        style={styles.singleItem}
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioSettings width={5} height={5} />
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
      <TouchableRipple style={styles.singleItem}>
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioNotification width={5} height={5} />
            <Text style={styles.text}>Notifications</Text>
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
      <TouchableRipple
        style={styles.singleItem}
        onPress={() => OpenMessenger()}
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioSupport width={5} height={5} />
            <Text style={styles.text}>Support</Text>
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
      <TouchableRipple
        style={styles.singleItem}
        onPress={() => Linking.openURL(Config.ABOUT_US)}
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioAboutIcon width={5} height={5} />
            <Text style={styles.text}>About BioMark</Text>
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
      <TouchableRipple
        style={styles.singleItem}
        onPress={() =>
          navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
            screen: SCREENS.TERMS_AND_PRIVACY,
          })
        }
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioPolicies width={5} height={5} />
            <Text style={styles.text}>Policies</Text>
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
      <TouchableRipple
        onPress={() => dispatch(logout())}
        style={styles.singleItem}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BioLogout width={4} height={4} />
          <Text style={styles.text}>Logout</Text>
        </View>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        style={styles.singleItem}
        onPress={() => props.onToggleAutoLogout()}
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioAutoLogout width={4} height={4} />
            <Text style={styles.text}>Auto Logout</Text>
          </View>
          <Switch
            color={GlobalColors.darkPrimary}
            value={props.logOutCheck}
            //    onValueChange={()=>props.onToggleAutoLogout()}
          />
        </>
      </TouchableRipple>
      <View style={styles.divider} />
    </View>
  );
};

export default AccountMenu;
