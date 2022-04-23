import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import Apple from '../../../assets/svgs/apple';
import Facebook from '../../../assets/svgs/facebook';
import Google from '../../../assets/svgs/google';
import Logo from '../../../assets/svgs/logo-name';
import Button from '../../../components/button/button';
import ErrorModal from '../../../components/error-modal/error-modal';
import TextInput from '../../../components/input-field/text-input';
import ActivityIndicator from '../../../components/loader/activity-indicator';
import PhoneNumber from '../../../components/phone-number/phone-number';
import {Nav_Screens} from '../../../navigation/constants';
import {navigate} from '../../../services/navRef';
import {reduxLogin} from '../../../store/auth/authActions';
import {IAppState} from '../../../store/IAppState';
// import InputField from '../../components/inputField/inputField';
import AuthContext from '../../../utils/auth-context';
import styles from './styles';
import auth from '@react-native-firebase/auth'
import { AppleButton,appleAuth } from '@invertase/react-native-apple-authentication';

export default function Login() {
  // redux
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const {loggingIn, errorMessageLogin} = useSelector(
    (state: IAppState) => state.auth,
  );

  const navigations = useNavigation();
  const authcontext = useContext(AuthContext);

  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('MY');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryCode, setSelectCountryCode] = useState('60');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [numberCondition, setNumberCondition] = useState({min: 8, max: 11});
  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [textToken, setText] = useState("");

  GoogleSignin.configure({
    webClientId:
      '871137629206-muidhs147vquoqovf71scmu89ibsaq7s.apps.googleusercontent.com',
    offlineAccess: false,
  });

  useEffect(() => {
    if (selectCountryCode == '60') setNumberCondition({min: 8, max: 11});
    else if (selectCountryCode == '63') setNumberCondition({min: 10, max: 10});
    else if (selectCountryCode == '65') setNumberCondition({min: 8, max: 8});
    else {
      setNumberCondition({min: 4, max: 13});
    }
  }, [selectCountryCode]);

  const GoogleLogin = async () => {
    // GoogleSignin.signOut();
    // await GoogleSignin.hasPlayServices()
    //   .then(response => {
    //     console.log('Play Services Response', response);
    //     GoogleSignin.signIn()
    //       .then(data => {
    //         console.log('Google Accounts Data ', Platform.OS, ' ', data.user);
    //         GoogleSignin.getTokens().then({});
    //         // props.navigation.navigate(TOP_TAB_BAR);
    //         authcontext.setUser(data.user.email);
    //       })
    //       .catch(error => {
    //         console.log('SignIn error --->', error);
    //       });
    //   })
    //   .catch(error => {
    //     console.log('Play services error --->', error);
    //     // Toast.show(error, Toast.LONG);
    //   });
    GoogleSignin.signOut();
    GoogleSignin.configure({
      webClientId: '1078990823809-1s2m5rup1t61rmmiic4ma5ag847d17u1.apps.googleusercontent.com',
      offlineAccess:true
    });
  
    const {idToken}= await GoogleSignin.signIn()
    const googleCrenditial=auth.GoogleAuthProvider.credential(idToken)
    const user_sign_in=auth().signInWithCredential(googleCrenditial)
    user_sign_in.then(re=>{
      console.log("re",re)
      
    })
  };

  const FacebookLogin = async () => {
    LoginManager.logOut();
    await LoginManager.logInWithPermissions().then(
      async function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          const data = await AccessToken.getCurrentAccessToken();
          console.log('Facebook data', data?.accessToken);
          handleFedrationLogin(data?.accessToken)

        }
      }, 
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const initUser = (token: any) => {
    // props.navigation.navigate(TOP_TAB_BAR);
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,picture.type(large),friends&access_token=' +
        token,
    )
      .then(response => {
        response.json().then(
          json => {
            console.log('Json response', json);
         
          },
          error => {
            alert(error.message);
          },
        );
      })
      .catch(error => {
        console.log('ERROR GETTING DATA FROM FACEBOOK');
        // Toast.show(error.message, Toast.LONG);
      });
  };

  // redux error check
  useEffect(() => {
    if (errorMessageLogin) {
      showMessage({
        message: errorMessageLogin,
        type: 'danger',
      });
    }
  }, [errorMessageLogin]);

  const handleLogin = async () => {
    const username = `+${selectCountryCode}${phoneNumber}`;
    Keyboard.dismiss();
    dispatch(reduxLogin(username, password));
    dispatch(reduxLogin("fsdfjkdsfdsjkfnjdsk", "ios"));
  };
  const handleFedrationLogin = async (accessToken:string) => {
  console.log("accessToken",accessToken);
  
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

        <View style={{height: 20}} />
        <Text style={[styles.inputLablel, {marginTop: 20}]}>Password</Text>
        <TextInput
          placeholder="Password"
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
            Password must have 8-11 characters long
          </Text>
        )}
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            style={{marginVertical: 30}}
            onPress={() => navigate(Nav_Screens.Forgot_Password)}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
<Text>{textToken}</Text>
        <Button
          onPress={() => handleLogin()}
          disabled={
            phoneNumber.length < numberCondition.min || password.length < 8
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
          }}>
          Login With
        </Text>
        <View style={styles.socialLogins}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => onAppleButtonPress()}>
              <Apple height="24" width="24" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => FacebookLogin()}>
            <Facebook height="20" width="20" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GoogleLogin()}>
            <Google />
          </TouchableOpacity>
        </View>

        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => navigate(Nav_Screens.Sign_Up)}>
            <Text style={styles.noAccountTxt}>
              <Text style={{color: colors.black}}>Dont have an account?</Text>
              <Text style={{color: colors.blue}}> SignUp</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
