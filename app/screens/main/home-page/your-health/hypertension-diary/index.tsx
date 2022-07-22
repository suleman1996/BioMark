/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
// import Video from 'react-native-video';

import SCREENS from 'navigation/constants/index';
import { TitleWithBackLayout } from 'components/layouts';

// import RenderHealthTrack from 'components/health-tracker-card/index';
import RenderHealthTrackDemo from 'components/health-tracker-card-demo/index';
import {
  BloodPressure,
  Medication,
  Weight,
} from 'components/hypertension-card-dairy';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import {
  getReduxPspHyperModules,
  getReduxPspHypertensionHealthTrackerData,
} from 'store/home/home-actions';
import PdfList from 'components/pdf-list';
import { userService } from 'services/user-service/user-service';
import { ActivityIndicator } from 'components';

import Styles from './styles';
import { useTheme } from 'react-native-paper';
import PdfSvg from 'assets/svgs/pdf';
import Messenger from 'assets/svgs/messenger';
import { useNavigation } from '@react-navigation/native';
import GradientButton from 'components/linear-gradient-button';
import { navigate } from 'services/nav-ref';
import WithdrawProgram from 'components/widthdraw-from-program';
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
const openMessenger = () => {
  Linking.openURL(Config.MESSENGER_URL);
};

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const HypertensionDiary = (props) => {
  const { t } = useTranslation();

  const { colors } = useTheme();
  const styles = Styles(colors);
  const [modalVisible, setModalVisible] = React.useState(false);

  const dispatch = useDispatch();

  // const { PDF_HYPERTENSION } = SCREENS;
  const navigation = useNavigation();

  const scrollRef = React.useRef(<ScrollView />);
  const scrollToView = (value) => {
    scrollRef.current?.scrollTo({
      y: value,
      animated: true,
    });
  };

  const trackerData = useSelector(
    (state: IAppState) => state.home.pspHypertensionHealthTracker
  );
  const hyperModuleData = useSelector(
    (state: IAppState) => state.home.pspHyperModuleData
  );
  const dashboard = useSelector((state: IAppState) => state.home.dashboard);

  const [showDemo, setShowDemo] = React.useState(false);
  const [pdfData, setPdfData] = React.useState([]);
  const [bloodPressureData, setbloodPressureData] = React.useState('');
  const [medicationData, setMedicationData] = React.useState('');
  const [weightData, setWeightData] = React.useState('');
  const [video, setVideo] = React.useState([]);
  const [isVisiable, setIsVisible] = React.useState(false);
  const [barCodeData, setBarCodeData] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);

  // useEffect(() => {
  //   dispatch(getReduxPspHyperModules());
  //   dispatch(getReduxPspHypertensionHealthTrackerData());
  // }, []);

  useEffect(() => {
    const pspHyperModuleData = async () => {
      try {
        setIsVisible(true);
        await dispatch(getReduxPspHypertensionHealthTrackerData());
        await dispatch(getReduxPspHyperModules());
        await setVideo(hyperModuleData.video);
        await setPdfData(hyperModuleData.pdf);
        setBarCodeData(dashboard?.program_detail?.barcode);
        setbloodPressureData(trackerData.blood_pressure);
        setMedicationData(trackerData.medication);
        setWeightData(trackerData.weight);
        setIsVisible(false);
      } catch (err) {
        setIsVisible(false);
        console.error(err);
      }
    };
    pspHyperModuleData();
    if (props?.route?.params?.showDemo) {
      setShowDemo(0);
    } else {
      setShowDemo(5);
    }
    // dispatch(getReduxPspHypertensionHealthTrackerData());
    // pspHyperModuleData();
    // dispatch(getReduxPspHyperModules());
    // setVideo(hyperModuleData.video);
    // setPdfData(hyperModuleData.pdf);
    // setBarCodeData(dashboard?.program_detail?.barcode);
    // setbloodPressureData(trackerData.blood_pressure);
    // setMedicationData(trackerData.medication);
    // setWeightData(trackerData.weight);
    // setRefresh(true);
  }, [hyperModuleData.video, hyperModuleData.pdf]);

  // const pspHyperModuleData = () => {
  //   try {
  //     setIsVisible(true);
  //     dispatch(getReduxPspHyperModules());
  //     setVideo(hyperModuleData.video);
  //     setPdfData(hyperModuleData.pdf);
  //     setIsVisible(false);
  //   } catch (err) {
  //     setIsVisible(false);
  //     console.error(err);
  //   }
  // };

  const [healthTracker] = React.useState([
    {
      id: 0,
      title: 'Blood Pressure',
      value: '124/65',
      subTitle: 'mmHg',
      color: colors.lightYellow,
    },
    {
      id: 1,
      title: 'Medication',
      value: '-',
      subTitle: 'Add',
      color: colors.blue,
    },
    {
      id: 2,
      title: 'Weight',
      value: '56',
      subTitle: 'kg',
      color: colors.blue,
    },
  ]);

  const PdfLink = ({ title, svg, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.recordKeepingView,
        { backgroundColor: colors.white, paddingHorizontal: 10 },
      ]}
    >
      <View style={{ width: '80%' }}>
        <Text style={styles.recordKeepinText}>{title}</Text>
      </View>

      <View style={{ width: '20%', alignItems: 'center' }}>{svg}</View>
    </TouchableOpacity>
  );

  const onWithdraw = async () => {
    try {
      setIsVisible(true);
      const response = await userService.withdraw({
        module: {
          barcode: barCodeData,
          bm_program_id: 3,
        },
      });

      setModalVisible(!modalVisible);
      navigate(SCREENS.YOUR_HEALTH);
      setIsVisible(false);
    } catch (err) {
      showMessage({
        message: err.errMsg.data.message,
        type: 'danger',
      });
      setIsVisible(false);
      setModalVisible(!modalVisible);
    }
  };

  const renderItem = ({ item }) => (
    <>
      <ImageBackground
        resizeMode="stretch"
        imageStyle={{ borderRadius: 8 }}
        source={{ uri: item.thumbnail }}
        style={styles.backgroundVideo}
      >
        <TouchableOpacity
          onPress={() =>
            navigate(SCREENS.VIDEO_HYPERTENSION_LIST, { code: item })
          }
        >
          <Image
            source={require('../../../../../assets/images/home/playbutton.png')}
            style={{
              height: 30,
              width: 30,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
  return (
    <>
      <TitleWithBackLayout
        isGradient={true}
        shouldGoBack={SCREENS.YOUR_HEALTH}
        title={t('pages.diabetesSupport.titles.hypertension_title')}
      >
        <ActivityIndicator visible={isVisiable} />

        <View style={{ flex: 1 }}>
          <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
            {showDemo !== 5 && <View style={styles.demoContainer}></View>}
            <View>
              <Text style={[styles.headingText, { marginVertical: 10 }]}>
                {t('pages.diabetesSupport.diaries.hypertension_diary')}
              </Text>
              <View
                style={{
                  position: 'relative',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}
                >
                  <BloodPressure
                    heading={bloodPressureData?.name}
                    value={bloodPressureData?.value}
                    text={bloodPressureData?.unit}
                    borderColor={
                      bloodPressureData?.card_status == 'elevated'
                        ? colors.lightYellow
                        : bloodPressureData?.card_status == 'high'
                        ? colors.dangerRed
                        : bloodPressureData?.card_status == 'none'
                        ? colors.primary
                        : null
                    }
                    color={
                      bloodPressureData?.card_status == 'elevated'
                        ? colors.lightYellow
                        : bloodPressureData?.card_status == 'high'
                        ? colors.dangerRed
                        : bloodPressureData?.card_status == 'none'
                        ? colors.primary
                        : null
                    }
                    onPressBloodPressure={() =>
                      navigation.navigate(SCREENS.BLOOD_PRESSURE)
                    }
                  />
                  <Medication
                    heading={medicationData?.name}
                    value={medicationData?.value}
                    text={medicationData?.unit}
                    borderColor={
                      medicationData?.card_status == 'elevated'
                        ? colors.lightYellow
                        : medicationData?.card_status == 'high'
                        ? colors.dangerRed
                        : medicationData?.card_status == 'none'
                        ? colors.primary
                        : null
                    }
                    color={
                      medicationData?.card_status == 'elevated'
                        ? colors.lightYellow
                        : medicationData?.card_status == 'high'
                        ? colors.dangerRed
                        : medicationData?.card_status == 'none'
                        ? colors.primary
                        : null
                    }
                    onPressMedication={() =>
                      navigation.navigate(SCREENS.MEDICATION)
                    }
                  />
                  <Weight
                    heading={weightData?.name}
                    value={weightData?.value}
                    text={weightData?.unit}
                    borderColor={
                      weightData?.card_status == 'elevated'
                        ? colors.lightYellow
                        : weightData?.card_status == 'high'
                        ? colors.dangerRed
                        : weightData?.card_status == 'none'
                        ? colors.primary
                        : null
                    }
                    color={
                      weightData?.card_status == 'elevated'
                        ? colors.lightYellow
                        : weightData?.card_status == 'high'
                        ? colors.dangerRed
                        : weightData?.card_status == 'none'
                        ? colors.primary
                        : null
                    }
                    onPressWeight={() => navigation.navigate(SCREENS.WEIGHT)}
                  />
                </View>
              </View>
              <View
                style={{
                  position: 'absolute',
                  zIndex: [0, 1, 2].includes(showDemo) ? 33 : 29,
                  flexDirection: 'row',
                  top: 50,
                  left: 20,
                }}
              >
                {showDemo === 0 && (
                  <RenderHealthTrackDemo item={healthTracker[0]} />
                )}
                {showDemo === 1 && (
                  <>
                    <View
                      style={{ height: 110, width: 100, marginLeft: '4%' }}
                    />
                    <RenderHealthTrackDemo item={healthTracker[1]} />
                  </>
                )}
                {showDemo === 2 && (
                  <>
                    <View
                      style={{ height: 110, width: 100, marginLeft: '6%' }}
                    />
                    <View style={{ height: 110, width: 100 }} />
                    <RenderHealthTrackDemo item={healthTracker[2]} />
                  </>
                )}
              </View>
              <Text style={[styles.headingText, { marginVertical: 10 }]}>
                {t('pages.diabetesSupport.educations.hypertension_education')}
              </Text>

              <View
                style={{
                  position: 'relative',
                  zIndex: showDemo === 3 ? 33 : 29,
                }}
              >
                <View style={styles.videoView}>
                  <FlatList
                    data={video}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>

              {/* view to show pdf on top */}
              {showDemo !== 5 && (
                <View
                  style={{
                    position: 'relative',
                    zIndex: showDemo === 4 ? 33 : 29,
                  }}
                >
                  <PdfLink
                    title="What Do I Need To Know About Hypertension?"
                    svg={<PdfSvg />}
                  />
                </View>
              )}
              <FlatList
                data={pdfData}
                renderItem={(item) => (
                  <PdfList
                    item={item}
                    onPress={() => {
                      navigate(SCREENS.PDF_HYPERTENSION_SUPPORT, {
                        code: item,
                      });
                    }}
                  />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
              />

              <WithdrawProgram
                text="Yes"
                visible={modalVisible}
                title="Are You Sure?"
                text2="Are you sure you want to withdraw from the Empower Program? You will lose access to all your Empower Program privileges."
                cancel="Cancel"
                cancelModal={() => setModalVisible(!modalVisible)}
                closeModal={() => setModalVisible(!modalVisible)}
                onPress={() => onWithdraw()}
                color={['#2C6CFC', '#2CBDFC']}
              />
              <View style={styles.bottomTextView}>
                <Text style={[styles.bottomText, { color: colors.heading }]}>
                  Tap to
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text
                    style={[
                      styles.bottomText,
                      { color: colors.blue, textDecorationLine: 'underline' },
                    ]}
                  >
                    {' '}
                    Withdraw from Program
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {showDemo !== 5 && (
            <View style={styles.demobottomView}>
              <View style={styles.demoTextView}>
                {showDemo === 0 && (
                  <Text style={styles.demoText}>
                    {t('pages.diabetesSupport.onboarding.demo.bloodPressure')}
                  </Text>
                )}
                {showDemo === 1 && (
                  <Text style={styles.demoText}>
                    {t('pages.diabetesSupport.onboarding.demo.medication')}
                  </Text>
                )}
                {showDemo === 2 && (
                  <Text style={styles.demoText}>
                    {t('pages.diabetesSupport.onboarding.demo.weight')}
                  </Text>
                )}
                {showDemo === 3 && (
                  <Text style={styles.demoText}>
                    {t('pages.diabetesSupport.onboarding.demo.video')}
                  </Text>
                )}
                {showDemo === 4 && (
                  <Text style={styles.demoText}>
                    {t('pages.diabetesSupport.onboarding.demo.more')}
                  </Text>
                )}
              </View>
              <View style={styles.demoButtonView}>
                <GradientButton
                  text={showDemo === 4 ? 'Finish' : 'Next'}
                  color={['#2C6CFC', '#2CBDFC']}
                  style={styles.gradientButton2}
                  onPress={() => {
                    setShowDemo((demo) => demo + 1),
                      showDemo == 2 && scrollToView(150);
                    showDemo == 3 && scrollToView(250);
                  }}
                />
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            zIndex: 29,
            position: showDemo != 5 ? 'absolute' : 'relative',
          }}
        >
          <TouchableWithoutFeedback onPress={() => openMessenger()}>
            <View style={styles.messengerView}>
              <Messenger />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* </View> */}
      </TitleWithBackLayout>
    </>
  );
};

export default HypertensionDiary;
