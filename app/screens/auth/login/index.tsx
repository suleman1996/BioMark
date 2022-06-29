import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Config from 'react-native-config';
import { useTheme } from 'react-native-paper';

import {
  ErrorModal,
  TextInput,
  ActivityIndicator,
  PhoneNumber,
  Button,
} from 'components';

import SCREENS from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { reduxLogin, reduxFederatedLogin } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';
import { useTranslation } from 'react-i18next';

import fonts from 'assets/fonts';
import { Apple, Facebook, Google } from 'assets/svgs/index';
import Logo from 'assets/svgs/appLogo';

import makeStyles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Login() {
  // redux
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('MY');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryCode, setSelectCountryCode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [numberCondition, setNumberCondition] = useState({ min: 8, max: 11 });

  const { loggingIn, errorMessageLogin } = useSelector(
    (state: IAppState) => state.auth
  );

  const geoLocation = useSelector(
    (state: IAppState) => state.account.geolocation
  );

  useEffect(() => {
    i18n.changeLanguage('en');
    if (selectCountryCode == '60') {
      setNumberCondition({ min: 8, max: 11 });
    } else if (selectCountryCode == '63') {
      setNumberCondition({ min: 10, max: 10 });
    } else if (selectCountryCode == '65') {
      setNumberCondition({ min: 8, max: 8 });
    } else {
      setNumberCondition({ min: 4, max: 13 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCountryCode]);

  // redux error check
  useEffect(() => {
    if (errorMessageLogin) {
      setLoginError(true);
    }
  }, [errorMessageLogin]);

  useEffect(() => {
    if (geoLocation.code) {
      setCountryCode(geoLocation.code);
      let countryCodeParse = geoLocation.dial_code.replace('+', '');
      setSelectCountryCode(countryCodeParse);
    }
  }, [geoLocation]);

  const onGoogleLogin = async () => {
    GoogleSignin.signOut();
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
      offlineAccess: true,
    });

    const { idToken } = await GoogleSignin.signIn();
    const provider = 'google';
    dispatch(reduxFederatedLogin(idToken, provider));

    const googleCrenditial = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCrenditial);
    user_sign_in.then((re) => {
      console.warn('re', re);
    });
  };

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.error('login info has error: ' + error);
        } else {
          console.error('result:', user);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onFacebookLogin = async () => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }

    await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        if (result.isCancelled) {
          console.warn('Login cancelled');
        } else {
          const data: any = await AccessToken.getCurrentAccessToken();
          getInfoFromToken(data?.accessToken);
          const provider = 'facebook';
          Keyboard.dismiss();
          dispatch(reduxFederatedLogin(data?.accessToken, provider));
        }
      },
      function (error) {
        console.error('Login fail with error: ' + error);
      }
    );
  };

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      const provider = 'apple';
      Keyboard.dismiss();
      dispatch(
        reduxFederatedLogin(appleAuthRequestResponse?.identityToken, provider)
      );
    }
  }

  const handleLogin = async () => {
    const username = `+${selectCountryCode}${phoneNumber}`;

    Keyboard.dismiss();
    dispatch(reduxLogin(username, password));
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loggingIn} />
      <ErrorModal
        onPress={() => setLoginError(!loginError)}
        visible={loginError}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.icon}>
          <Logo height="120" width="170" />
        </View>
        <Text style={styles.heading}>{t('pages.landing.welcome')}</Text>
        <Text style={styles.inputLablel}>{t('userProfile.mobileNumber')}</Text>
        <PhoneNumber
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setSelectCountryCode={setSelectCountryCode}
          maxLength={numberCondition.max}
        />
        {phoneNumber !== '' &&
          (selectCountryCode == 63 ? (
            phoneNumber.charAt(0) == 0 ? (
              <Text style={styles.errorMessage}>
                Phonenumber must not start with 0
              </Text>
            ) : (
              phoneNumber.length < numberCondition.min && (
                <Text style={styles.errorMessage}>
                  {t('pages.login.errors.phoneNumberTooShort')}
                  {numberCondition.min}
                  {numberCondition.max !== numberCondition.min &&
                    -numberCondition.max}
                  {t('pages.login.errors.characters')}
                </Text>
              )
            )
          ) : (
            phoneNumber.length < numberCondition.min && (
              <Text style={styles.errorMessage}>
                {t('pages.login.errors.phoneNumberTooShort')}
                {numberCondition.min}
                {numberCondition.max !== numberCondition.min &&
                  -numberCondition.max}
                {t('pages.login.errors.characters')}
              </Text>
            )
          ))}

        <View style={{ height: 20 }} />
        <Text style={[styles.inputLablel, { marginTop: 20 }]}>
          {t('userProfile.password')}
        </Text>
        <TextInput
          secureTextEntry={hidePassword}
          eye={hidePassword ? 'eye-off' : 'eye'}
          value={password}
          onEyePress={() => {
            setHidePassword(!hidePassword);
          }}
          onChange={setPassword}
          margin={20}
        />
        {password !== '' && password.length < 8 && (
          <Text style={styles.errorMessage}>
            {t('pages.password.passwordRules')}
          </Text>
        )}
        {!PASS_REGIX.test(password) && password.length > 7 ? (
          <Text style={styles.errorMessage}>
            {t('pages.password.passwordRules')}
          </Text>
        ) : null}
        <View style={{ alignSelf: 'center' }}>
          <TouchableOpacity
            style={{ marginVertical: 30 }}
            onPress={() => navigate(SCREENS.FORGOT_PASSWORD)}
          >
            <Text style={styles.forgotPassword}>
              {t('pages.login.forgotPassword')}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={() => handleLogin()}
          disabled={
            phoneNumber.length < numberCondition.min ||
            password.length < 8 ||
            !PASS_REGIX.test(password)
              ? true
              : false
          }
          title={t('pages.login.login')}
        />
        <View style={styles.orView}>
          <View style={styles.dash} />
          <Text style={styles.orTxt}>{t('pages.login.or')}</Text>
          <View style={styles.dash} />
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: fonts.regular,
            fontSize: RFValue(15),
            color: colors.black,
          }}
        >
          Log in With
        </Text>
        <View style={styles.socialLogins}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => onAppleButtonPress()}>
              <Apple height="24" width="24" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => onFacebookLogin()}>
            <Facebook height="20" width="20" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onGoogleLogin()}>
            <Google />
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <View style={styles.noAccountTxt}>
            <Text
              style={{
                color: colors.black,
                fontFamily: fonts.mulishRegular,
                fontSize: RFValue(15),
              }}
            >
              {t('pages.login.newToBiomark')}
            </Text>
            <TouchableOpacity onPress={() => navigate(SCREENS.SIGNUP)}>
              <Text
                style={{
                  color: colors.blue,
                  fontFamily: fonts.bold,
                  fontSize: RFValue(15),
                }}
              >
                {' '}
                {t('pages.login.signUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
