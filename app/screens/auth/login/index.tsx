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

import fonts from 'assets/fonts';
import { Logo, Apple, Facebook, Google } from 'assets/svgs/index';

import makeStyles from './styles';

export const PASS_REGIX = /^(?=.*\d)(?=.*[@#$%^&+=]).+$/;
export default function Login() {
  // redux
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { loggingIn, errorMessageLogin } = useSelector(
    (state: IAppState) => state.auth
  );

  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('MY');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryCode, setSelectCountryCode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [numberCondition, setNumberCondition] = useState({ min: 8, max: 11 });

  const geoLocation = useSelector(
    (state: IAppState) => state.account.geolocation
  );

  useEffect(() => {
    if (selectCountryCode == '60') {
      setNumberCondition({ min: 8, max: 11 });
    } else if (selectCountryCode == '63') {
      setNumberCondition({ min: 10, max: 10 });
    } else if (selectCountryCode == '65') {
      setNumberCondition({ min: 8, max: 8 });
    } else {
      setNumberCondition({ min: 4, max: 13 });
    }
  }, [selectCountryCode]);

  // redux error check
  useEffect(() => {
    if (errorMessageLogin) {
      setLoginError(true);
    }
  }, [errorMessageLogin]);

  useEffect(() => {
    console.log('locc =======>', geoLocation);
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
      console.log('re', re);
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
          console.log('login info has error: ' + error);
        } else {
          console.log('result:', user);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onFacebookLogin = async () => {
    // LoginManager.logOut();
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }

    await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          const data: any = await AccessToken.getCurrentAccessToken();
          getInfoFromToken(data?.accessToken);
          console.log('Facebook data', data);
          const provider = 'facebook';
          Keyboard.dismiss();
          dispatch(reduxFederatedLogin(data?.accessToken, provider));
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      }
    );
  };

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

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
    console.log('username', username);

    Keyboard.dismiss();
    dispatch(reduxLogin(username, password));
  };

  return (
    <View
      style={
        // [
        styles.container
        // { backgroundColor: globalColors.background }]
      }
    >
      <ActivityIndicator visible={loggingIn} />
      <ErrorModal
        onPress={() => setLoginError(!loginError)}
        visible={loginError}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.icon}>
          <Logo height="120" width="170" />
        </View>
        <Text style={styles.heading}>Welcome back!</Text>
        <Text style={styles.inputLablel}>Mobile Number</Text>
        <PhoneNumber
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setSelectCountryCode={setSelectCountryCode}
          maxLength={numberCondition.max}
        />
        {phoneNumber !== '' && phoneNumber.length < numberCondition.min && (
          <Text style={styles.errorMessage}>
            Must have {numberCondition.min}
            {numberCondition.max !== numberCondition.min &&
              -numberCondition.max}{' '}
            characters
          </Text>
        )}

        <View style={{ height: 20 }} />
        <Text style={[styles.inputLablel, { marginTop: 20 }]}>Password</Text>
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
            Password must be at least 8 characters long
          </Text>
        )}
        {!PASS_REGIX.test(password) && password.length > 7 ? (
          <Text style={styles.errorMessage}>
            Atleast have one digit and one special character
          </Text>
        ) : null}
        <View style={{ alignSelf: 'center' }}>
          <TouchableOpacity
            style={{ marginVertical: 30 }}
            onPress={() => navigate(SCREENS.FORGOT_PASSWORD)}
          >
            <Text style={styles.forgotPassword}>Forgot password?</Text>
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
          title="Login"
        />
        <View style={styles.orView}>
          <View style={styles.dash} />
          <Text style={styles.orTxt}>Or</Text>
          <View style={styles.dash} />
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: fonts.regular,
            fontSize: 16,
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
            <Text style={{ color: colors.black }}>Dont have an account?</Text>
            <TouchableOpacity onPress={() => navigate(SCREENS.SIGNUP)}>
              <Text style={{ color: colors.blue }}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
