import React, { useContext, useEffect } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { showMessage } from 'react-native-flash-message';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { TitleWithBackLayout } from 'components/layouts';
import { EditProfileModal, ActivityIndicator } from 'components';

import SCREENS from 'navigation/constants';
import { navigate } from 'services/nav-ref';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import AuthContext from 'utils/auth-context';
import { userService } from 'services/user-service/user-service';

import Images from 'assets/images';

import makeStyles from './styles';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { getUserProfileData } from 'store/profile/profile-actions';

let cameraIs = false;

const EditProfileScreen = () => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [edit, setEdit] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [profileLoader, setProfileLoader] = React.useState(false);

  // get user profile
  /* eslint-disable */
  const getUserOnFocus = async () => {
    await dispatch(getUserProfileData());
  };
  useEffect(() => {
    getUserOnFocus();
  }, [focused]);
  /* eslint-enable */
  const updateProfilePhoto = async (pic: any) => {
    try {
      setIsLoading(true);
      const [profilePic] = await Promise.all([
        userService.updateProfileAvatar(pic),
      ]);
      console.log('profile success ', profilePic.data);

      const result = await userService.getUserProfile();
      authContext.setUserData(result.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const EditProfile = () => (
    <View style={styles.editView}>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setShowModal(true)}
      >
        <MaterialCommunityIcons
          name={'pencil-outline'}
          size={responsiveFontSize(22)}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );

  const imagePickerFromGallery = () => {
    setShowModal(false);
    if (!cameraIs) {
      cameraIs = true;
      let options = {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: true,
      };
      launchImageLibrary(options, (res) => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
          cameraIs = false;
        } else if (res.errorMessage) {
          console.log('ImagePicker Error: ', res.errorMessage);
          cameraIs = false;
        } else {
          updateProfilePhoto(res.assets[0].base64);
          setEdit(false);
          cameraIs = false;
        }
      });
    }
  };

  const imagePickerFromCamera = async () => {
    setShowModal(false);

    const granted =
      Platform.OS == 'ios' ||
      (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }));
    if (granted) {
      if (!cameraIs) {
        cameraIs = true;

        let options = {
          mediaType: 'photo',
          includeBase64: true,
        };
        launchCamera(options, (res) => {
          if (res.didCancel) {
            console.log('User cancelled image picker');
            cameraIs = false;
          } else if (res.errorMessage) {
            console.log('Camera error: ', res.errorMessage);
            cameraIs = false;
          } else {
            if (res.assets) {
              updateProfilePhoto(res.assets[0].base64);
              setEdit(false);
            }
            cameraIs = false;
          }
        });
      }
    }
  };

  return (
    <TitleWithBackLayout shadow={colors.blue} title="Your Profile">
      <ActivityIndicator visible={isLoading} />
      <EditProfileModal
        iconPress={() => setShowModal(false)}
        visible={showModal}
        onPressGallery={() => imagePickerFromGallery()}
        onPressPhoto={() => imagePickerFromCamera()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBg} />
        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            {edit && <EditProfile />}
            <TouchableOpacity
              style={[styles.image, { overflow: 'hidden' }]}
              onPress={() => setEdit(true)}
            >
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
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{authContext?.userData?.patient_name}</Text>
          <View style={styles.menuContainer}>
            <Text
              style={{
                fontSize: responsiveFontSize(20),
                color: colors.darkPrimary,
                fontFamily: GlobalFonts.light,
              }}
            >
              ABOUT ME
            </Text>
            <Pressable
              onPress={() => navigate(SCREENS.PERSONAL_INFORMATION)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="human-male"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Personal Information</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(SCREENS.BODY_MEASUREMENT)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="human-male"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Body Measurement</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(SCREENS.MEDICAL_HISTORY)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="plus"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Medical History</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>

            <Pressable
              onPress={() => navigate(SCREENS.VACCINATION)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="needle"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Vaccination</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>

            <Pressable
              style={styles.menuOption}
              onPress={() => navigate(SCREENS.ALLERGIES)}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="allergy"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Allergies</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(SCREENS.FAMILY_MEDICAL_HISTORY)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialIcons
                  name="groups"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Family Medical History</Text>
              </View>

              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>

            <Pressable
              onPress={() => navigate(SCREENS.SMOKING)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="smoking"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />

                <Text style={styles.menuTitleText}>Smoking</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>

            <Pressable
              onPress={() => navigate(SCREENS.DRINKING)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialIcons
                  name="local-drink"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Drinking</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(SCREENS.EXERCISE)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Excercise</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(SCREENS.SLEEP)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <Ionicons
                  name="moon"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Sleep</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(SCREENS.STRESS)}
              style={styles.menuOption}
            >
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="lightning-bolt"
                  size={responsiveFontSize(22)}
                  color={colors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Stress</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={colors.darkPrimary}
              />
            </Pressable>
          </View>
        </View>
        <Text
          style={{
            marginTop: 15,
            color: colors.darkPrimary,
            fontFamily: GlobalFonts.light,
          }}
        >
          v50.18.205
        </Text>
      </ScrollView>
    </TitleWithBackLayout>
  );
};

export default EditProfileScreen;
