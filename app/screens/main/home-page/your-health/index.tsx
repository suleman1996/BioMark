import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Modal,
  Image,
  Keyboard,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { navigate } from 'services/nav-ref';
import LinearGradient from 'react-native-linear-gradient';

import { SearchBarWithLeftScanIcon } from 'components/higher-order';

import { Button } from 'components/button';
import { ArrowBack } from 'assets/svgs';

import RenderHealthTrack from '../../../../components/health-tracker-card/index';
import ArticleWebView from 'components/article-webview/index';
import LabResultProgressBar from '../../../../components/lab-result-pregress-bar/index';
import RenderSvg from 'components/render-svg/index';
import {
  Diabetess,
  Heart_Disease,
  Blood_Presure,
  BMII,
  Drinkings,
  Heart_Disease_ref,
  Heart_Disease_footnotes,
  Diabetes_ref,
  Diabetes_footnotes,
  Blood_Pressure_ref,
  BMI_ref,
  Smoking_ref,
  Drinking_ref,
  Stress_ref,
  Sleeping_ref,
  heart_Diease_Calc,
  diabetes_Calc,
  Blood_Pressure_Calc,
  BMI_Calc,
  Smoking_Calc,
  Drinking_Calc,
  Stress_Calc,
  Sleeping_Calc,
} from '../health-risk/list-data';

import * as Yup from 'yup';
import Styles from './styles';
import SCREENS from 'navigation/constants/index';
import makeStyles from './styles';

import Heart from '../../../../assets/svgs/heart';
import Camera from '../../../../assets/svgs/report-scan';
import ReportVerify from '../../../../assets/svgs/report-verify';
import Diabetes from '../../../../assets/svgs/diabtes';
import BP from '../../../../assets/svgs/bP';
import BMI from '../../../../assets/svgs/Bmi';
import Smoking from '../../../../assets/svgs/smoking';
import Drinking from '../../../../assets/svgs/Drinking';
import Stress from '../../../../assets/svgs/stress';
import Sleep from '../../../../assets/svgs/sleep';
import Health from '../../../../assets/svgs/Health';
import Progress from '../../../../assets/svgs/Progress';
import Processing from '../../../../assets/svgs/report-processing';
import ReportView from '../../../../assets/svgs/report-viewing';
import fonts from 'assets/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { SmallButton } from 'components/button';
import MyImage from 'assets/images';
import { Formik } from 'formik';
import { userService } from 'services/user-service/user-service';
import AuthContext from 'utils/auth-context';
import { showMessage } from 'react-native-flash-message';
import { InputWithLabel } from 'components/base';
import { getReduxLabResultStatus } from 'store/home/home-actions';

const QrInputPopup = ({ visible, children, loading }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [showModal, setShowModal] = React.useState(visible);

  React.useEffect(() => {
    togglePopUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const togglePopUp = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <ActivityIndicator visible={loading} />
      <View style={styles.popUpBackground}>
        <View style={styles.popUpContainer}>{children}</View>
      </View>
    </Modal>
  );
};

const Index = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const { colors } = useTheme();

  const styles = Styles(colors);
  const { HYPERTENSION, HEALTH_PROGRESS } = SCREENS;
  // const { HEALTH_STRESS } = SCREENS;

  const hell = useSelector((state: IAppState) => state.home.healthTracker);
  const dashboard = useSelector((state: IAppState) => state.home.dashboard);
  const healthRisk = useSelector((state: IAppState) => state.home.healthRisks);

  const getMedNewTracker = useSelector(
    (state: IAppState) => state.home.getNewMedicationTracker
  );
  const getLabStatusData = useSelector(
    (state: IAppState) => state.home.getLabStatusData
  );

  useEffect(() => {
    setHealthRisksData(healthRisk);
    handleHEalthTracker();
    console.log('getLabStatusData', getLabStatusData);

    console.log('getMedNewTracker', getMedNewTracker);
    console.log('Health Trackeer api =======>', hell);
    console.log('Dashboard api =======>', dashboard);
    console.log('healthRisk api =======>', healthRisk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleHEalthTracker = () => {
    healthTracker.length = 0;
    let id = -1;
    Object.entries(hell).map((item) => {
      item[1]?.name &&
        healthTracker.push({
          id: id + 1,
          title: item[1]?.name,
          value: item[1]?.value,
          subTitle: item[1]?.unit,
          color:
            item[1]?.card_status == 'none'
              ? colors.blue
              : item[1]?.card_status == 'high'
              ? colors.dangerRed
              : colors.lightYellow,
        });
    });
  };

  const [highlights] = React.useState([
    {
      id: 0,
      title: 'Drink Milk Everyday',
      image:
        'https://www.morningagclips.com/wp-content/uploads/2018/09/milk-600x400.jpg',
    },
    {
      id: 1,
      title: 'Face Mast is a Must',
      image: 'https://m.media-amazon.com/images/I/415R2a9DgmL.jpg',
    },
    {
      id: 2,
      title: 'Dangue Fever',
      image:
        'https://www.morningagclips.com/wp-content/uploads/2018/09/milk-600x400.jpg',
    },
  ]);

  const [healthTracker] = React.useState([]);
  const [stepIndicatorIcons] = React.useState([
    <Camera />,
    <Processing />,
    <ReportView />,
    <ReportVerify />,
  ]);
  const [healthRisksData, setHealthRisksData] = React.useState([]);

  const [selectedHealthRisk, setSelectedHealthRisk] = React.useState();
  const [selectedHardCode, setSelectedHardCode] = React.useState();
  const [selectedRef, setSelectedRef] = React.useState();
  const [selectedFootNotes, setSelectedFootNotes] = React.useState();
  const [selectedCalculations, setselectedCalculations] = React.useState();
  const [colorr, setColorr] = useState('');
  const [idHealth, setId] = useState();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showApiError, setShowApiError] = React.useState('');
  const [showArticle, setShowArticle] = React.useState(false);

  //   const [yourHealthRisk, setYourHealthRisk] = React.useState(false);
  const handleCode = async ({ qrInput }: any) => {
    Keyboard.dismiss();
    console.log('qrInput', qrInput);
    console.log('identification_id', authContext?.userData?.ic_number);

    try {
      setLoading(true);
      const response = await userService.labStatusVerify({
        result: {
          barcode: qrInput,
          identification_id: authContext?.userData?.ic_number,
        },
      });
      console.log('res', response);
      dispatch(getReduxLabResultStatus());
      if (response?.data?.message === 'Invalid request') {
        setShowApiError(
          'IC or passport number validation is unsucessful. Please check and try again'
        );
      } else {
        setVisible(false);
        setLoading(false);
        console.log('status updated', response.data.message);
      }
    } catch (error) {
      setLoading(false);
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
  const RenderHealthRiskView = ({
    Svg,
    color,
    healthRisks,
    hardCode,
    References,
    FootNotes,
    Calculations,
    id,
  }) => (
    <>
      <TouchableOpacity
        onPress={() => {
          setSelectedHealthRisk(healthRisks),
            setSelectedHardCode(hardCode),
            setSelectedRef(References);
          setSelectedFootNotes(FootNotes);
          setselectedCalculations(Calculations);
          setColorr(color);
          setId(id);
        }}
        style={[
          styles.renderHealthRisk,
          {
            backgroundColor:
              healthRisks?.name == selectedHealthRisk?.name
                ? colors.lightGrey
                : color,
          },
        ]}
      >
        <Svg />
      </TouchableOpacity>
      <View style={styles.dot} />
    </>
  );

  const RenderRecordKeeping = ({ title, id, svg, onPress }) => (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={['#2C6CFC', '#2CBDFC']}
      style={styles.recordKeepingView}
    >
      <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
        {svg}
        <Text style={[styles.recordKeepinText, { marginTop: 10 }]}>
          {title}
        </Text>
        <Text
          style={[
            styles.recordKeepinText,
            { fontSize: 14, fontFamily: fonts.light, marginBottom: 10 },
          ]}
        >
          Empower ID: {id}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  const RenderLastResult = ({ title, date, svg, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.recordKeepingView, { backgroundColor: colors.white }]}
    >
      {svg}
      <Text
        style={[
          styles.recordKeepinText,
          { marginTop: 10, color: colors.heading, fontWeight: 'bold' },
        ]}
      >
        {title}
      </Text>
      <Text style={[styles.date]}>Receive on {date}</Text>
    </TouchableOpacity>
  );

  const RenderCircle = ({ svg, title, onPress }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={styles.circle} onPress={onPress}>
        {svg}
      </TouchableOpacity>
      <Text style={styles.circleText}>{title}</Text>
    </View>
  );

  const RenderHighlights = ({ item }) => (
    <>
      <TouchableOpacity onPress={() => setShowArticle(true)}>
        <View style={styles.highlightsView}>
          <ImageBackground
            style={{ flex: 1 }}
            // resizeMode="stretch"
            source={{ uri: item.image }}
          >
            <BlurView title={item.title} />
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </>
  );

  const BlurView = ({ title }) => (
    <View style={styles.blurView}>
      <Text style={styles.highlightstext}>{title}</Text>
    </View>
  );

  const RenderHealthRisk = ({
    description,
    name,
    card_status,
    onPress,
    id,
  }) => (
    <Animated.View
      {...panResponder.panHandlers}
      style={[pan.getLayout(), styles.healthRisk]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RenderSvg color={colorr} id={id} />

          <Text style={styles.healthName}>{name}</Text>
        </View>
        <Text style={styles.healthCardStatusName}>{card_status}</Text>
      </View>
      <Text style={styles.descriptionHealthRisk}>
        <Text>{description} </Text>
        <TouchableWithoutFeedback onPress={onPress}>
          <Text style={[{ fontWeight: 'bold', color: colors.heading }]}>
            Tap here{' '}
          </Text>
        </TouchableWithoutFeedback>
        <Text>to complete your information</Text>
      </Text>
    </Animated.View>
  );

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        // dy: pan.y,
      },
    ]),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        { toValue: { x: 0, y: 0 } } // Back to zero
      ).start();
    },
  });

  const RendreLabResult = ({ item }) => {
    return (
      <>
        <View style={styles.resultStatusView}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.resultStatus}>Your Lab Result Status</Text>
            <Text style={[styles.barcode]}>Barcode {item?.lab_ref_id}</Text>
          </View>
          <LabResultProgressBar
            currentPosition={4 - item?.status_order}
            icons={stepIndicatorIcons}
          />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.resultStatus}>{item?.status_name}</Text>
            <Text style={[styles.barcode]}>{item?.status_message}</Text>
          </View>
          {item?.result_status === 'verified' ? (
            <View
              style={{
                width: '40%',
                alignSelf: 'center',
                paddingVertical: 10,
              }}
            >
              <SmallButton
                title="See Results"
                style={{ height: 45 }}
                onPress={() => setVisible(true)}
              />
            </View>
          ) : null}
        </View>
      </>
    );
  };

  const healthRisksColor = (status) => {
    if (status == 'Obese') {
      return colors.Obese;
    } else if (status == 'High') {
      return colors.High;
    } else if (status == 'none') {
      return colors.none;
    } else if (status == 'normal') {
      return colors.normal;
    } else if (status == 'high') {
      return colors.high;
    } else if (status == 'bad') {
      return colors.bad;
    } else {
      return colors.none;
    }
  };

  return (
    <>
      {showArticle ? (
        <ArticleWebView />
      ) : (
        <View style={styles.container}>
          <View style={styles.navBar}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowBack fill={colors.white} />
              </TouchableOpacity>
              <Text style={styles.navHeading}>Your Health</Text>
            </View>
            <View style={styles.navSearch}>
              <SearchBarWithLeftScanIcon />
            </View>
          </View>
          <View style={styles.containerBody}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.headingText}>Your Health Risks</Text>
              <View style={styles.healthRiskView}>
                <RenderHealthRiskView
                  id={0}
                  healthRisks={healthRisksData?.heart}
                  color={healthRisksColor(healthRisksData?.heart?.status)}
                  Svg={Heart}
                  hardCode={Heart_Disease}
                  References={Heart_Disease_ref}
                  FootNotes={Heart_Disease_footnotes}
                  Calculations={heart_Diease_Calc}
                />
                <RenderHealthRiskView
                  id={1}
                  color={healthRisksColor(healthRisksData?.diabetes?.status)}
                  healthRisks={healthRisksData?.diabetes}
                  Svg={Diabetes}
                  hardCode={Diabetess}
                  References={Diabetes_ref}
                  FootNotes={Diabetes_footnotes}
                  Calculations={diabetes_Calc}
                />
                <RenderHealthRiskView
                  id={2}
                  color={healthRisksColor(healthRisksData?.bp?.status)}
                  healthRisks={healthRisksData?.bp}
                  Svg={BP}
                  hardCode={Blood_Presure}
                  References={Blood_Pressure_ref}
                  Calculations={Blood_Pressure_Calc}
                />
                <RenderHealthRiskView
                  id={3}
                  color={healthRisksColor(healthRisksData?.bmi?.status)}
                  healthRisks={healthRisksData?.bmi}
                  Svg={BMI}
                  hardCode={BMII}
                  References={BMI_ref}
                  Calculations={BMI_Calc}
                />
                <RenderHealthRiskView
                  id={4}
                  color={healthRisksColor(healthRisksData?.smoking?.status)}
                  healthRisks={healthRisksData?.smoking}
                  Svg={Smoking}
                  References={Smoking_ref}
                  Calculations={Smoking_Calc}
                />
                <RenderHealthRiskView
                  id={5}
                  color={healthRisksColor(healthRisksData?.drinking?.status)}
                  healthRisks={healthRisksData?.drinking}
                  Svg={Drinking}
                  hardCode={Drinkings}
                  References={Drinking_ref}
                  Calculations={Drinking_Calc}
                />
                <RenderHealthRiskView
                  id={6}
                  color={healthRisksColor(healthRisksData?.stress?.status)}
                  healthRisks={healthRisksData?.stress}
                  Svg={Stress}
                  References={Stress_ref}
                  Calculations={Stress_Calc}
                />
                <RenderHealthRiskView
                  id={7}
                  color={healthRisksColor(healthRisksData?.sleeping?.status)}
                  healthRisks={healthRisksData?.sleeping}
                  Svg={Sleep}
                  References={Sleeping_ref}
                  Calculations={Sleeping_Calc}
                />
              </View>
              {selectedHealthRisk && (
                <RenderHealthRisk
                  onPress={() =>
                    navigate(SCREENS.HEALTH_RISK, {
                      item: selectedHealthRisk,
                      cardData: selectedHardCode,
                      refData: selectedRef,
                      footNotesData: selectedFootNotes,
                      calc: selectedCalculations,
                      clr: colorr,
                      i_d: idHealth,
                    })
                  }
                  name={selectedHealthRisk?.name}
                  description={selectedHealthRisk?.description}
                  card_status={selectedHealthRisk?.card_status}
                  id={idHealth}
                />
              )}
              <Text style={[styles.headingText, { marginVertical: 20 }]}>
                Health Trackers
              </Text>

              <FlatList
                data={healthTracker}
                renderItem={(item) => <RenderHealthTrack item={item} />}
                keyExtractor={(item) => item.index}
                horizontal
                showsHorizontalScrollIndicator={false}
              />

              <Text style={[styles.headingText, { marginVertical: 20 }]}>
                Record Keeping
              </Text>

              <RenderRecordKeeping
                svg={<Diabetes />}
                title="Enter Diabetes Support Center"
                id="4y6yb5y5yb56b56y"
                onPress={() => navigate(SCREENS.DIABETES_CENTER)}
              />
              <RenderRecordKeeping
                svg={<BP />}
                title="Enter Hypertension Support Center"
                id="4y6yb5y5yb56b56y"
                onPress={() => navigation.navigate(HYPERTENSION)}
              />

              <RenderLastResult
                title="Your Last Result"
                date={'Dec 12 2022'}
                svg={<BP fill={colors.blue} />}
              />

              <View style={styles.circleView}>
                <RenderCircle
                  title="Health Records"
                  svg={<Health />}
                  onPress={() => navigate(SCREENS.HEALTH_RECORD)}
                />
                <RenderCircle
                  title="Health Progress"
                  svg={<Progress />}
                  onPress={() => navigation.navigate(HEALTH_PROGRESS)}
                />
              </View>
              <FlatList
                data={getLabStatusData}
                renderItem={(item) => (
                  <RendreLabResult item={item.item} setVisible={setVisible} />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
              />

              <Text style={[styles.headingText, { marginVertical: 20 }]}>
                Article Highlights
              </Text>

              <FlatList
                keyExtractor={(item) => item.id}
                data={highlights}
                renderItem={(item) => RenderHighlights(item)}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              />
              <TouchableOpacity style={styles.singleMenuItem}>
                {/* popup Modal */}
                <Formik
                  initialValues={{
                    qrInput: '',
                  }}
                  onSubmit={(values) => handleCode(values)}
                  validationSchema={QRschemma}
                >
                  {({ handleChange, handleSubmit, errors, isValid }) => (
                    <QrInputPopup loading={loading} visible={visible}>
                      <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <View style={styles.popUpHeader}>
                          <Text style={styles.popUpHeading}>
                            Results Available
                          </Text>
                          <TouchableOpacity onPress={() => setVisible(false)}>
                            <Image
                              source={MyImage.closeIcon}
                              style={{
                                height: 15,
                                width: 15,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontFamily: fonts.regular,
                          fontSize: 17,
                          color: '#8493AE',
                        }}
                      >
                        Please enter your IC or passport number to verify your
                        identity
                      </Text>

                      <View style={{ width: '100%' }}>
                        {/* <TextInput
                      backgroundColor={colors.inputBg}
                      style={styles.textInput}
                      marginTop={10}
                      onChange={handleChange('qrInput')}
                      placeholder={'Enter your IC / Passport number'}
                    /> */}
                        <InputWithLabel
                          label="IC or Passport Number"
                          placeholder={'Enter your IC / Passport number'}
                          onChange={() => {
                            handleChange('qrInput');
                            setShowApiError('');
                          }}
                          error={
                            errors.qrInput
                              ? errors.qrInput
                              : showApiError
                              ? showApiError
                              : ''
                          }
                        />
                        <View style={{ marginTop: 40 }}>
                          <TouchableOpacity>
                            <Button
                              onPress={() => handleSubmit()}
                              title="Verify"
                              marginHorizontal={0.1}
                              marginVertical={0.1}
                              //   disabled={!isValid && errors}
                              disabled={!isValid && errors ? true : false}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </QrInputPopup>
                  )}
                </Formik>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};
export default Index;
const QRschemma = Yup.object({
  qrInput: Yup.string().required('IC or Passport are required'),
});
