import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Images from '../../../../../assets/images/images';
import TitleWithBackLayout from '../../../../../components/layouts/back-with-title/index';
import {
  heightToDp,
  widthToDp,
} from '../../../../../utils/functions/responsiveDimentions';
import {Nav_Screens} from '../../../../../navigation/constants/index';
import {navigate} from '../../../../../services/navRef';
import {responsiveFontSize} from '../../../../../utils/functions/responsiveText';
import {GlobalFonts} from '../../../../../utils/theme/fonts';
import {GlobalColors} from '../../../../../utils/theme/globalColors';
import {} from 'react-native-gesture-handler';
import EditProfileModal from '../../../../../components/edit-profile-menu/edit-profile-menu';

const EditProfileScreen = () => {
  const [edit, setEdit] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const EditProfile = () => (
    <View style={styles.editView}>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setShowModal(true)}>
        <MaterialCommunityIcons
          name={'pencil-outline'}
          size={responsiveFontSize(22)}
          color={GlobalColors.white}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <TitleWithBackLayout title="Your Profile">
      <EditProfileModal
        iconPress={() => setShowModal(false)}
        visible={showModal}
        onPressGallery={() => console.log('Gallery Press')}
        onPressPhoto={() => console.log('Photo Press')}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBg} />
        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            {edit && <EditProfile />}
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Image source={Images.avatar} style={styles.image} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Gerold Mordena</Text>
          <View style={styles.menuContainer}>
            <Text
              style={{
                fontSize: responsiveFontSize(20),
                color: GlobalColors.darkPrimary,
                fontFamily: GlobalFonts.light,
              }}>
              ABOUT ME
            </Text>
            <Pressable
              onPress={() => navigate(Nav_Screens.Personal_Information)}
              style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="human-male"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Personal Information</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(Nav_Screens.Body_Measurement)}
              style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="human-male"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Body Measurement</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(Nav_Screens.Medical_History)}
              style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="plus"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Medical History</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </Pressable>
            <View style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="needle"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Vaccination</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </View>
            <View style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="allergy"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Allergies</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </View>
            <View style={styles.menuOption}>
              <Pressable
                onPress={() => navigate(Nav_Screens.FamilyMedicalHistory)}
                style={styles.menuOption}>
                <View style={styles.menuTitleAndIcon}>
                  <MaterialIcons
                    name="family-restroom"
                    size={responsiveFontSize(22)}
                    color={GlobalColors.darkPrimary}
                  />
                  <Text style={styles.menuTitleText}>
                    Family Medical History
                  </Text>
                </View>
              </Pressable>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </View>

            <Pressable
              onPress={() => navigate(Nav_Screens.Smoking)}
              style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="smoking"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Smooking</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </Pressable>

            <Pressable
              onPress={() => navigate(Nav_Screens.Drinking)}
              style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <MaterialIcons
                  name="local-drink"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Drinking</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(Nav_Screens.Exercise)}
              style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Excercise</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </Pressable>
            <Pressable
              onPress={() => navigate(Nav_Screens.Sleep)}
              style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <Ionicons
                  name="moon"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Sleep</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </Pressable>
            <View style={styles.menuOption}>
              <View style={styles.menuTitleAndIcon}>
                <MaterialCommunityIcons
                  name="lightning-bolt"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.darkPrimary}
                />
                <Text style={styles.menuTitleText}>Stress</Text>
              </View>
              <Fontisto
                name="angle-right"
                size={responsiveFontSize(18)}
                color={GlobalColors.darkPrimary}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TitleWithBackLayout>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: heightToDp(7),
  },
  topBg: {
    width: widthToDp(100),
    height: heightToDp(7),
    position: 'absolute',
    top: 0,
    backgroundColor: GlobalColors.primary,
  },
  image: {
    width: widthToDp(25),
    height: widthToDp(25),
    borderRadius: widthToDp(12.5),
  },
  contentContainer: {
    width: widthToDp(92),
    backgroundColor: GlobalColors.white,
    flex: 1,
    marginTop: heightToDp(4),
    borderRadius: widthToDp(3),
    alignItems: 'center',
  },
  profileContainer: {
    width: widthToDp(25),
    height: widthToDp(25),
    borderRadius: widthToDp(12.5),
    position: 'absolute',
    top: -heightToDp(3),
    backgroundColor: GlobalColors.white,
  },
  name: {
    marginTop: heightToDp(12),
    fontSize: responsiveFontSize(25),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
  menuContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: widthToDp(3),
    marginTop: heightToDp(2),
    marginBottom: heightToDp(3),
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightToDp(1),
  },
  menuTitleAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitleText: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.light,
    marginLeft: widthToDp(4),
  },
  editView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#3D3D3D90',
    borderRadius: widthToDp(12.5),
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
