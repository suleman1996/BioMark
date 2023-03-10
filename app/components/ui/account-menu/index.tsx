import React from 'react';
import { Linking, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import Config from 'react-native-config';
import { Switch, TouchableRipple } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch, useSelector } from 'react-redux';

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
import { useTranslation } from 'react-i18next';

import makeStyles from './styles';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { IAppState } from 'store/IAppState';

const AccountMenu = (props) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const devices = useSelector(
    (state: IAppState) => state.tryvital.connectedDevices
  );

  const dispatch = useDispatch();
  const openMessenger = () => {
    Linking.openURL(Config.MESSENGER_URL);
  };

  const setVerificationText = () => {
    console.log('eeer', props.id_verification);

    let status;
    switch (props.id_verification) {
      case 'SUCCESS':
        status = t('pages.more.links.verification.verified');
        break;
      case 'PENDING':
        status = t('pages.more.links.verification.pending');
        break;
      case 'DENIED':
        status = t('pages.more.links.verification.notVerified');
        break;
      case false:
        status = t('pages.more.links.verification.notVerified');
        break;
      default:
        status = t('pages.more.links.verification.error');
        break;
    }
    return status;
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={() => {
          if (
            props?.id_verification == 'PENDING' ||
            props?.id_verification == 'SUCCESS'
          ) {
            console.error('error', props.id_verification);
          } else {
            navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
              screen: SCREENS.ID_VERIFICATION_START,
            });
          }
        }}
        style={styles.singleItem}
      >
        <>
          <View
            style={[
              setVerificationText() ==
              'Verification error. Please resubmit details'
                ? { flexDirection: 'column' }
                : {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '95%',
                  },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <BioIdentify width={5} height={3} />
              <Text style={styles.text}>
                {t('pages.more.links.idVerification')}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.secondText,
                setVerificationText() ==
                'Verification error. Please resubmit details'
                  ? {
                      lineHeight: 12,
                      color: colors.danger,
                      paddingLeft: widthToDp(8),
                      fontSize: responsiveFontSize(12),
                    }
                  : null,
              ]}
            >
              {setVerificationText()}
            </Text>
          </View>
          <View style={styles.iconWithSecondText}>
            {props?.id_verification == 'PENDING' ||
            props?.id_verification == 'SUCCESS' ? null : (
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(22)}
                color={colors.darkPrimary}
              />
            )}
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
            <Text style={styles.text}>{t('pages.more.links.dependants')}</Text>
          </View>
          <View style={styles.iconWithSecondText}>
            {props.dependentsCount > 0 && (
              <Text style={styles.secondText}>
                {props.dependentsCount} Users
              </Text>
            )}
            <Fontisto
              name="angle-right"
              size={responsiveFontSize(22)}
              color={colors.darkPrimary}
            />
          </View>
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        onPress={() => navigate(SCREENS.MANAGE_DEVICE)}
        style={styles.singleItem}
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioDependent width={5} height={5} />
            <Text style={styles.text}>Devices</Text>
          </View>
          <View style={styles.iconWithSecondText}>
            <Text style={styles.secondText}>
              {devices.length > 0 ? devices.length : 'No'} device(s)
            </Text>
            <Fontisto
              name="angle-right"
              size={responsiveFontSize(22)}
              color={colors.darkPrimary}
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
            <Text style={styles.text}>{t('pages.more.links.settings')}</Text>
          </View>
          <Fontisto
            name="angle-right"
            size={responsiveFontSize(22)}
            color={colors.darkPrimary}
          />
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        style={styles.singleItem}
        onPress={() => {
          navigate(SCREENS.INBOX);
        }}
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioNotification width={5} height={5} />
            <Text style={styles.text}>
              {t('pages.more.links.notifications')}
            </Text>
          </View>
          <Fontisto
            name="angle-right"
            size={responsiveFontSize(22)}
            color={colors.darkPrimary}
          />
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        style={styles.singleItem}
        onPress={() => openMessenger()}
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioSupport width={5} height={5} />
            <Text style={styles.text}>{t('pages.more.links.support')}</Text>
          </View>
          <Fontisto
            name="angle-right"
            size={responsiveFontSize(22)}
            color={colors.darkPrimary}
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
            <Text style={styles.text}>{t('pages.more.links.about')}</Text>
          </View>
          <Fontisto
            name="angle-right"
            size={responsiveFontSize(22)}
            color={colors.darkPrimary}
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
            params: {
              privacyPolicy: false,
              headerHome: true,
            },
          })
        }
      >
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BioPolicies width={5} height={5} />
            <Text style={styles.text}>{t('pages.more.links.policies')}</Text>
          </View>
          <Fontisto
            name="angle-right"
            size={responsiveFontSize(22)}
            color={colors.darkPrimary}
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
          <BioLogout width={4.5} height={4.5} />
          <Text style={styles.text}>{t('pages.more.links.logout')}</Text>
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
            <BioAutoLogout width={4.5} height={4.5} />
            <Text style={styles.text}>{t('pages.more.links.autoLogout')}</Text>
          </View>
          <Switch
            color={colors.darkPrimary}
            value={props.logOutCheck}
            onValueChange={() => props.onToggleAutoLogout()}
          />
        </>
      </TouchableRipple>
      <View style={styles.divider} />
    </View>
  );
};

export default AccountMenu;
