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
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import _ from 'lodash';
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
// import Health from '../../../../assets/svgs/Health';
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
  getReduxHealthFeeds,
  getReduxLatestResult,
  getReduxPastResult,
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
import Paginator from 'components/paginator';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';

import { fromResponse } from 'screens/main/home-page/your-health/components/render-health-risk-view/service';

const Index = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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
  const healthFeeds = useSelector(
    (state: IAppState) => state.home.getHealthFeeds
  );
  const getLabStatusData = useSelector(
    (state: IAppState) => state.home.getLabStatusData
  );
  const [healthRiskColor, setHealthRiskColor] = React.useState([]);
  // States
  const [healthTracker, setHealthTracker] = React.useState([]);
  const [stepIndicatorIcons] = React.useState([
    <Camera />,
    <Processing />,
    <ReportView />,
    <ReportVerify />,
  ]);

  const [selectedRisk, setSelectedRisk] = useState('');
  const [selectedHealthRisk, setSelectedHealthRisk] = useState('');

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showApiError, setShowApiError] = React.useState('');
  const [showArticleWebView, setShowArticleWebView] = React.useState(false);
  const [articlesUrl, setArticlesUrl] = React.useState();
  const [selectedIndicator, setSelectedIndicator] = React.useState({
    first: true,
    second: false,
  });

  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    dispatch(getReduxDashboard());
    dispatch(getReduxHealthTracker());
    dispatch(getHealthTrackerRisks());
    dispatch(getReduxLabResultStatus());
    dispatch(getReduxHealthFeeds());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    handleHEalthTracker();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [healthTrackerFromStore, isFocused]);

  useEffect(() => {
    setHealthRiskColor(fromResponse(healthRisk));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [healthRisk, isFocused]);

  const handleHEalthTracker = useCallback(() => {
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
  }, [healthTrackerFromStore, colors]);

  const handleCode = async ({ qrInput }: any) => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const response = await userService.labStatusVerify({
        result: {
          barcode: qrInput,
          identification_id: authContext?.userData?.ic_number,
        },
      });

      dispatch(getReduxLabResultStatus());
      if (response?.data?.message === 'Invalid request') {
        setShowApiError(
          'IC or passport number validation is unsucessful. Please check and try again'
        );
      } else {
        setVisible(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

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

  const healthRiskCheck = (item) => {
    item?.name === 'Blood Pressure' &&
      navigation.navigate(SCREENS.BLOOD_PRESSURE, {
        back: SCREENS.YOUR_HEALTH,
      });
    item?.name === 'Smoking' && navigation.navigate(SCREENS.SMOKING);
    item?.name === 'Stress' && navigation.navigate(SCREENS.STRESS);
    item?.name === 'Sleeping' && navigation.navigate(SCREENS.SLEEP);
    item?.name === 'Drinking' && navigation.navigate(SCREENS.DRINKING);
    (item?.name === 'Heart Disease' ||
      item?.name === 'Diabetes' ||
      item?.name === 'BMI') &&
      navigate(SCREENS.HEALTH_RISK, {
        item: healthRisk[selectedRisk],
        cardData: healthRiskData[selectedRisk].disease,
        refData: healthRiskData[selectedRisk].refrence,
        footNotesData: healthRiskData[selectedRisk].footnotes,
        calc: healthRiskData[selectedRisk].calculations,
        clr: healthRisksColor(colors, healthRisk[selectedRisk]?.status),
        SVG: healthRiskData[selectedRisk].icon,
        title:
          item?.name === 'Heart Disease'
            ? 'Upload Results'
            : item?.name === 'Diabetes'
            ? checkDiabtiesBtn(item.button_type)
            : 'Enter Height and Weight',
        onPress: checkDiabtiesBtnPress(item),
      });
  };

  const checkDiabtiesBtn = (btnType) => {
    if (btnType == 'exercise') {
      return 'Complete Exercise';
    }
    if (btnType == 'bmi') {
      return 'Enter Height and Weight';
    }
    if (btnType == 'medical') {
      return 'Complete Medical History';
    }

    if (btnType == 'family_medical') {
      return 'Complete Family Medical History';
    }
  };

  const checkDiabtiesBtnPress = (item) => {
    if (item?.name === 'Heart Disease') {
      return SCREENS.RESULT_UPLOAD;
    } else if (item?.name === 'Diabetes') {
      if (item?.button_type == 'exercise') return SCREENS.EXERCISE;
      else if (item?.button_type == 'bmi') return SCREENS.BODY_MEASUREMENT;
      else if (item?.button_type == 'medical') return SCREENS.MEDICAL_HISTORY;
      else if (item?.button_type == 'family_medical')
        return SCREENS.FAMILY_MEDICAL_HISTORY;
    } else {
      return SCREENS.BODY_MEASUREMENT;
    }
  };

  const handleHealthTrackerColor = (value) => {
    for (let i = 0; i < healthRiskColor.length; i++) {
      if (healthRiskColor[i].name == value) {
        return healthRiskColor[i].statusColor;
      }
    }
  };

  const keys = useMemo(() => {
    const newKeys = Object.entries(healthRisk);
    const temp = _.cloneDeep(newKeys[newKeys.length - 1]);
    newKeys[newKeys.length - 1] = newKeys[newKeys.length - 2];
    newKeys[newKeys.length - 2] = temp;
    return newKeys;
  }, [healthRisk]);

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
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HOME)}>
              <ArrowBack fill={colors.white} />
            </TouchableOpacity>
            <Text style={styles.navHeading}>
              {t('pages.search.yourHealth.label')}
            </Text>
          </View>
          <View style={styles.navSearch}>
            <SearchBarWithLeftScanIcon />
          </View>
        </View>
        <View style={styles.containerBody}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.headingText}>
              {t('pages.dashboard.riskTitle')}
            </Text>
            <View style={styles.healthRiskView}>
              {keys.map(([key, value]: any) => (
                <>
                  <RenderHealthRiskView
                    key={key}
                    name={value?.name}
                    onRiskPress={() => {
                      setSelectedRisk(key), setSelectedHealthRisk(value);
                    }}
                    color={handleHealthTrackerColor(value?.name)}
                    Svg={healthRiskData[key].icon}
                    status={value?.status}
                    selectedHealthRisk={selectedHealthRisk}
                    btnType={value?.button_type}
                  />
                </>
              ))}
            </View>
            {selectedRisk ? (
              <RenderHealthRisk
                onPress={() =>
                  healthRisk[selectedRisk]?.status == 'none'
                    ? healthRiskCheck(healthRisk[selectedRisk])
                    : navigate(SCREENS.HEALTH_RISK, {
                        item: healthRisk[selectedRisk],
                        cardData: healthRiskData[selectedRisk].disease,
                        refData: healthRiskData[selectedRisk].refrence,
                        footNotesData: healthRiskData[selectedRisk].footnotes,
                        calc: healthRiskData[selectedRisk].calculations,
                        clr: handleHealthTrackerColor(
                          healthRisk[selectedRisk]?.name
                        ),
                        SVG: healthRiskData[selectedRisk].icon,
                      })
                }
                healthRisk={healthRisk[selectedRisk]}
                Svg={healthRiskData[selectedRisk].icon}
                color={handleHealthTrackerColor(healthRisk[selectedRisk]?.name)}
                pan={pan}
              />
            ) : null}

            <Text style={[styles.headingText, { marginVertical: 20 }]}>
              {t('pages.dashboard.healthTrackers')}
            </Text>

            <FlatList
              data={healthTracker}
              renderItem={(item) => <RenderHealthTrack item={item} />}
              keyExtractor={(item) => item.title}
              horizontal
              showsHorizontalScrollIndicator={false}
              onEndReached={() =>
                setSelectedIndicator({
                  first: false,
                  second: true,
                })
              }
              onMomentumScrollBegin={() => {
                setSelectedIndicator({
                  first: true,
                  second: false,
                });
              }}
              bounces={true}
            />
            {healthTracker?.length > 3 && (
              <Paginator selectedIndicator={selectedIndicator} />
            )}

            <Text style={[styles.headingText, { marginVertical: 20 }]}>
              {t('pages.dashboard.psp.recordKeeping')}
            </Text>

            {dashboard?.psp_user &&
              [2, 4].includes(dashboard?.program_detail?.program_id) && (
                <RenderRecordKeeping
                  svg={<Diabetes />}
                  title={t('pages.dashboard.psp.titles.titleDiabetes')}
                  id={dashboard?.psp_code}
                  onPress={() => navigate(SCREENS.DIABETES_CENTER)}
                />
              )}
            {dashboard?.psp_user &&
              [3, 4].includes(dashboard?.program_detail?.program_id) && (
                <RenderRecordKeeping
                  svg={<BP />}
                  title={t('pages.dashboard.psp.titles.titleHypertension')}
                  id={dashboard?.psp_code}
                  onPress={() => navigation.navigate(HYPERTENSION)}
                />
              )}

            {dashboard?.latest_result && (
              <RenderLastResult
                title={t('pages.resultSummary.tabs.summary.latestResult')}
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
                title={t('pages.dashboard.updateProfile')}
                date={t('pages.dashboard.updateProfileText')}
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
                title={t('pages.dashboard.healthRecords')}
                Image={
                  <Image
                    style={{ height: 25, width: 25 }}
                    source={require('assets/images/home/HealthRecord.png')}
                  />
                }
                // svg={<Health />}
                onPress={() => {
                  dispatch(getReduxLatestResult());
                  dispatch(getReduxPastResult());
                  navigate(SCREENS.HEALTH_RECORD);
                }}
              />
              <RenderCircle
                title={t('pages.dashboard.healthProgress')}
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
              {t('pages.dashboard.suggestedReading')}
            </Text>

            <FlatList
              keyExtractor={(item) => item.id}
              data={healthFeeds}
              renderItem={(item) => (
                <RenderHighlights
                  item={item.item}
                  onPress={() => {
                    setShowArticleWebView(true), setArticlesUrl(item.item.link);
                  }}
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
                {({ handleChange, handleSubmit, errors, isValid, values }) => (
                  <QrInputPopup loading={loading} visible={visible}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                      <View style={styles.popUpHeader}>
                        <Text style={styles.popUpHeading}>
                          {t('pages.dashboard.dialogs.verify.title')}
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
                      {t('pages.dashboard.dialogs.verify.description')}
                    </Text>

                    <View style={{ width: '100%' }}>
                      <InputWithLabel
                        label={t('pages.dashboard.dialogs.verify.label')}
                        placeholder={'Enter your IC / Passport number'}
                        onChange={handleChange('qrInput')}
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
                            title={t('common.verify')}
                            marginHorizontal={0.1}
                            marginVertical={0.1}
                            //   disabled={!isValid && errors}
                            disabled={
                              !isValid || !values.qrInput || !errors
                                ? true
                                : false
                            }
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
      {showArticleWebView ? <WebView url={articlesUrl} /> : null}
    </>
  );
};
export default Index;
const QRschemma = Yup.object({
  qrInput: Yup.string().required(
    "  i18next.t('pages.dashboard.dialogs.verify.errors.required')"
  ),
});
