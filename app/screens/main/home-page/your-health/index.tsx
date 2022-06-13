import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  Keyboard,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { navigate } from 'services/nav-ref';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import { Button } from 'components/button';
import { ArrowBack } from 'assets/svgs';
import WebView from 'components/article-webview';

import RenderHealthTrack from '../../../../components/health-tracker-card/index';

import { healthRiskData } from '../health-risk/list-data';

import * as Yup from 'yup';
import Styles from './styles';
import SCREENS from 'navigation/constants/index';

import Camera from '../../../../assets/svgs/report-scan';
import ReportVerify from '../../../../assets/svgs/report-verify';
import Diabetes from '../../../../assets/svgs/diabtes';
import BP from '../../../../assets/svgs/bP';
import Health from '../../../../assets/svgs/Health';
import Progress from '../../../../assets/svgs/Progress';
import Processing from '../../../../assets/svgs/report-processing';
import ReportView from '../../../../assets/svgs/report-viewing';
import fonts from 'assets/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import MyImage from 'assets/images';
import { Formik } from 'formik';
import { userService } from 'services/user-service/user-service';
import AuthContext from 'utils/auth-context';
import { showMessage } from 'react-native-flash-message';
import { InputWithLabel } from 'components/base';
import {
  getHealthTrackerRisks,
  getReduxDashboard,
  getReduxHealthTracker,
  getReduxLabResultStatus,
} from 'store/home/home-actions';
import RenderHealthRiskView from './components/render-health-risk-view/index';
import QrInputPopup from './components/qr-input-popup';
import RenderRecordKeeping from './components/render-record-keeping';
import RenderLastResult from './components/render-last-result';
import RendreLabResult from './components/render-lab-result';
import RenderCircle from './components/render-circle';
import RenderHighlights from './components/render-high-lights';
import RenderHealthRisk from './components/render-health-risk';

import { healthRisksColor } from 'utils/functions/your-health';

const Index = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const { colors } = useTheme();
  const styles = Styles(colors);

  const { HYPERTENSION, HEALTH_PROGRESS } = SCREENS;

  // Redux Store data
  const healthTrackerFromStore = useSelector(
    (state: IAppState) => state.home.healthTracker
  );
  const dashboard = useSelector((state: IAppState) => state.home.dashboard);
  const healthRisk = useSelector((state: IAppState) => state.home.healthRisks);
  const getLabStatusData = useSelector(
    (state: IAppState) => state.home.getLabStatusData
  );
  console.log('getLabStatusData', getLabStatusData);

  // States
  const [healthTracker, setHealthTracker] = React.useState([]);
  const [stepIndicatorIcons] = React.useState([
    <Camera />,
    <Processing />,
    <ReportView />,
    <ReportVerify />,
  ]);

  const [selectedRisk, setSelectedRisk] = useState('');

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showApiError, setShowApiError] = React.useState('');
  const [showArticleWebView, setShowArticleWebView] = React.useState(false);
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
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    dispatch(getReduxDashboard());
    dispatch(getReduxHealthTracker());
    dispatch(getHealthTrackerRisks());
    dispatch(getReduxLabResultStatus());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    handleHEalthTracker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [healthTrackerFromStore]);

  const handleHEalthTracker = () => {
    const tempTracker = [];
    let id = -1;
    Object.entries(healthTrackerFromStore).map((item) => {
      item[1]?.name &&
        tempTracker.push({
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
    setHealthTracker([...tempTracker]);
  };

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

  console.log('================>', dashboard);

  return (
    <>
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
              {Object.entries(healthRisk).map(([key, value]: any) => (
                <RenderHealthRiskView
                  key={key}
                  name={value?.name}
                  onRiskPress={() => setSelectedRisk(key)}
                  color={healthRisksColor(colors, value?.status)}
                  Svg={healthRiskData[key].icon}
                />
              ))}
            </View>
            {selectedRisk ? (
              <RenderHealthRisk
                onPress={() =>
                  navigate(SCREENS.HEALTH_RISK, {
                    item: healthRisk[selectedRisk],
                    cardData: healthRiskData[selectedRisk].disease,
                    refData: healthRiskData[selectedRisk].refrence,
                    footNotesData: healthRiskData[selectedRisk].footnotes,
                    calc: healthRiskData[selectedRisk].calculations,
                    clr: healthRisksColor(
                      colors,
                      healthRisk[selectedRisk]?.status
                    ),
                    SVG: healthRiskData[selectedRisk].icon,
                  })
                }
                healthRisk={healthRisk[selectedRisk]}
                Svg={healthRiskData[selectedRisk].icon}
                color={healthRisksColor(
                  colors,
                  healthRisk[selectedRisk]?.status
                )}
                pan={pan}
              />
            ) : null}
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

            {dashboard?.psp_user &&
              [2, 4].includes(dashboard?.program_detail?.program_id) && (
                <RenderRecordKeeping
                  svg={<Diabetes />}
                  title="Enter Diabetes Support Center"
                  id="4y6yb5y5yb56b56y"
                  onPress={() => navigate(SCREENS.DIABETES_CENTER)}
                />
              )}
            {dashboard?.psp_user &&
              [3, 4].includes(dashboard?.program_detail?.program_id) && (
                <RenderRecordKeeping
                  svg={<BP />}
                  title="Enter Hypertension Support Center"
                  id="4y6yb5y5yb56b56y"
                  onPress={() => navigation.navigate(HYPERTENSION)}
                />
              )}

            {dashboard?.latest_result && (
              <RenderLastResult
                title="Your Last Result"
                date={dashboard?.latest_result?.received}
                onPress={() =>
                  navigate(SCREENS.RESULT_OVERVIEW, {
                    lab_id: dashboard?.latest_result?.lab_id,
                  })
                }
                svg={
                  <MaterialCommunityIcons
                    name="file-document"
                    size={25}
                    color={colors.primary}
                  />
                }
              />
            )}

            {!dashboard?.complete_profile && (
              <RenderLastResult
                title="Complete Your Profile"
                date={'Fill in your profile to know your health risks'}
                onPress={() => navigate(SCREENS.ACCOUNT)}
                svg={
                  <MaterialIcons
                    name="person"
                    size={25}
                    color={colors.primary}
                  />
                }
              />
            )}

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
            {getLabStatusData ? (
              <FlatList
                data={getLabStatusData}
                renderItem={(item) => (
                  <RendreLabResult
                    item={item.item}
                    setVisible={setVisible}
                    stepIndicatorIcons={stepIndicatorIcons}
                  />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
              />
            ) : null}

            <Text style={[styles.headingText, { marginVertical: 20 }]}>
              Article Highlights
            </Text>

            <FlatList
              keyExtractor={(item) => item.id}
              data={highlights}
              renderItem={(item) => (
                <RenderHighlights
                  item={item.item}
                  onPress={() => setShowArticleWebView(true)}
                />
              )}
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
      {showArticleWebView ? <WebView /> : null}
    </>
  );
};
export default Index;
const QRschemma = Yup.object({
  qrInput: Yup.string().required('IC or Passport are required'),
});
