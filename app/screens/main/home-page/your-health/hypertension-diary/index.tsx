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

import Styles from './styles';
import { useTheme } from 'react-native-paper';
import PdfSvg from 'assets/svgs/pdf';
import Messenger from 'assets/svgs/messenger';
import { useNavigation } from '@react-navigation/native';
import GradientButton from 'components/linear-gradient-button';
import { navigate } from 'services/nav-ref';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
const openMessenger = () => {
  Linking.openURL(Config.MESSENGER_URL);
};

const HypertensionDiary = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const dispatch = useDispatch();

  // const { PDF_HYPERTENSION } = SCREENS;
  const navigation = useNavigation();

  const trackerData = useSelector(
    (state: IAppState) => state.home.pspHypertensionHealthTracker
  );
  const hyperModuleData = useSelector(
    (state: IAppState) => state.home.pspHyperModuleData
  );

  const [showDemo, setShowDemo] = React.useState(false);
  const [pdfData, setPdfData] = React.useState([]);
  const [bloodPressureData, setbloodPressureData] = React.useState('');
  const [medicationData, setMedicationData] = React.useState('');
  const [weightData, setWeightData] = React.useState('');
  const [video, setVideo] = React.useState([]);

  useEffect(() => {
    dispatch(getReduxPspHypertensionHealthTrackerData());
    dispatch(getReduxPspHyperModules());

    console.log('hyper dataaa', hyperModuleData);
    setVideo(hyperModuleData.video);
    setPdfData(hyperModuleData.pdf);
    // alert(JSON.stringify(hyperModuleData.pdf));

    setbloodPressureData(trackerData.blood_pressure);
    setMedicationData(trackerData.medication);
    setWeightData(trackerData.weight);

    setShowDemo(0);
  }, []);

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
        title="Hypertension Support Center"
      >
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {showDemo !== 5 && <View style={styles.demoContainer}></View>}
            <View>
              <Text style={[styles.headingText, { marginVertical: 10 }]}>
                YOUR HYPERTENSION DAIRY
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
                    <View style={{ height: 110, width: 100 }} />
                    <RenderHealthTrackDemo item={healthTracker[1]} />
                  </>
                )}
                {showDemo === 2 && (
                  <>
                    <View style={{ height: 110, width: 100, marginLeft: 10 }} />
                    <View style={{ height: 110, width: 100 }} />
                    <RenderHealthTrackDemo item={healthTracker[2]} />
                  </>
                )}
              </View>
              <Text style={[styles.headingText, { marginVertical: 10 }]}>
                HYPERTENSION EDUCATION
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
              <View style={styles.bottomTextView}>
                <Text style={[styles.bottomText, { color: colors.heading }]}>
                  Tap to
                </Text>
                <TouchableOpacity>
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
                    Log your blood pressure here.
                  </Text>
                )}
                {showDemo === 1 && (
                  <Text style={styles.demoText}>Log your medication here.</Text>
                )}
                {showDemo === 2 && (
                  <Text style={styles.demoText}>Log your weight here.</Text>
                )}
                {showDemo === 3 && (
                  <Text style={styles.demoText}>
                    View helpful video tutorials here.
                  </Text>
                )}
                {showDemo === 4 && (
                  <Text style={styles.demoText}>
                    Learn more about hypertension here.
                  </Text>
                )}
              </View>
              <View style={styles.demoButtonView}>
                <GradientButton
                  text={showDemo === 4 ? 'Finish' : 'Next'}
                  color={['#2C6CFC', '#2CBDFC']}
                  style={styles.gradientButton2}
                  onPress={() => setShowDemo((demo) => demo + 1)}
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
