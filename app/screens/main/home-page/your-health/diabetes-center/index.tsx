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
import React, { useState, useEffect } from 'react';

import { TitleWithBackLayout } from 'components/layouts';
import RenderHealthTrack from 'components/health-tracker-card/index';
import RenderHealthTrackDemo from 'components/health-tracker-card-demo/index';
import PdfList from 'components/pdf-list';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import { ActivityIndicator } from 'components';
import WithdrawProgram from 'components/widthdraw-from-program';
import { userService } from 'services/user-service/user-service';

import SCREENS from 'navigation/constants';
import PdfSvg from 'assets/svgs/pdf';
import Messenger from 'assets/svgs/messenger';
import { navigate } from 'services/nav-ref';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { getReduxPspModules } from 'store/home/home-actions';
import Config from 'react-native-config';
import { showMessage } from 'react-native-flash-message';
import GradientButton from 'components/linear-gradient-button';
import { useTranslation } from 'react-i18next';

const openMessenger = () => {
  Linking.openURL(Config.MESSENGER_URL);
};

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const DiabetesCenter = (props) => {
  const [isVisiable, setIsVisible] = React.useState(false);
  const [showDemo, setShowDemo] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfData, setPdfData] = useState([]);
  const [video, setVideo] = useState([]);
  const [healthTracker] = React.useState([]);
  const [barCodeData, setBarCodeData] = React.useState('');
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = Styles(colors);

  const scrollRef = React.useRef(<ScrollView />);
  const scrollToView = (value) => {
    scrollRef.current?.scrollTo({
      y: value,
      animated: true,
    });
  };

  const pspModuleData = useSelector(
    (state: IAppState) => state.home.pspModuleData
  );
  const hell = useSelector((state: IAppState) => state.home.healthTracker);
  const dashboard = useSelector((state: IAppState) => state.home.dashboard);

  useEffect(() => {
    dispatch(getReduxPspModules());
  }, []);

  useEffect(() => {
    PspModuleData();
    handleHEalthTracker();
    setBarCodeData(dashboard?.program_detail?.barcode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (props?.route?.params?.showDemo) {
      setShowDemo(0);
    } else {
      setShowDemo(5);
    }
  }, []);

  const PspModuleData = () => {
    try {
      dispatch(getReduxPspModules());
      setPdfData(pspModuleData.pdf);
      setVideo(pspModuleData.video);
    } catch (err) {
      console.error(err);
    }
  };

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

  const [healthTrackerDemo] = React.useState([
    {
      id: 0,
      title: 'Blood Sugar',
      value: '110',
      subTitle: 'mg/dL',
      color: colors.lightYellow,
    },
    {
      id: 1,
      title: 'Medication',
      value: '50',
      subTitle: 'Units',
      color: colors.blue,
    },
    {
      id: 2,
      title: 'HbA1c',
      value: '8',
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
        source={{ uri: item.thumbnail }}
        style={styles.backgroundVideo}
      >
        <TouchableOpacity
          onPress={() => navigate(SCREENS.VIDEO_LIST, { code: item })}
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

  const onWithdraw = async () => {
    try {
      setIsVisible(true);
      const response = await userService.withdraw({
        module: {
          barcode: barCodeData,
          bm_program_id: 2,
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

  return (
    <TitleWithBackLayout
      shouldGoBack={SCREENS.YOUR_HEALTH}
      isGradient={true}
      title={t('pages.diabetesSupport.titles.diabetes_title')}
    >
      <ActivityIndicator visible={isVisiable} />
      {/* <View style={styles.containerBody}> */}
      <View style={{ flex: 1 }}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          {showDemo !== 5 && <View style={styles.demoContainer}></View>}
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            {t('pages.diabetesSupport.diaries.diabetes_diary')}
          </Text>
          <View style={{ marginHorizontal: 15 }}>
            <FlatList
              data={healthTracker}
              renderItem={(item) => <RenderHealthTrack item={item} />}
              keyExtractor={(item) => item.index}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {/* <FlatList
    <TitleWithBackLayout
      backTo={SCREENS.YOUR_HEALTH}
      isGradient={true}
      title="Diabetes Support Center"
    >
      <View style={{ flex: 1 }}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          {showDemo !== 5 && <View style={styles.demoContainer}></View>}
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            YOUR DIABETES DIARY
          </Text>
          <View style={{ marginHorizontal: 15 }}>
            <FlatList
              data={healthTracker}
              renderItem={(item) => <RenderHealthTrack item={item} />}
              keyExtractor={(item) => item.index}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
           <FlatList
            style={{ alignSelf: 'center' }}
            data={healthTracker}
            renderItem={(item) => <RenderHealthTrack item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}
          <View
            style={{
              position: 'absolute',
              zIndex: [0, 1, 2].includes(showDemo) ? 33 : 29,
              flexDirection: 'row',
              top: 50,
              left: 20,
              // position: 'absolute',
              // zIndex: [0, 1, 2].includes(showDemo) ? 33 : 29,
              // flexDirection: 'row',
              // top: 45,
              // marginHorizontal: 15,
            }}
          >
            {showDemo === 0 && (
              <RenderHealthTrackDemo item={healthTrackerDemo[0]} />
            )}
            {showDemo === 1 && (
              <>
                <View style={{ height: 110, width: 100, marginLeft: '4%' }} />
                <RenderHealthTrackDemo item={healthTrackerDemo[1]} />
              </>
            )}
            {showDemo === 2 && (
              <>
                <View style={{ height: 110, width: 100, marginLeft: '36%' }} />
                {/* <View style={{ height: 110, width: 100 }} /> */}
                <RenderHealthTrackDemo item={healthTrackerDemo[2]} />
              </>
            )}
          </View>
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            {t('pages.diabetesSupport.educations.diabetes_education')}
          </Text>
          {/* {showDemo === 3 && (
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
                <RenderHealthTrackDemo item={healthTrackerDemo[0]} />
              )}
              {showDemo === 1 && (
                <>
                  <View style={{ height: 110, width: 100 }} />
                  <RenderHealthTrackDemo item={healthTrackerDemo[1]} />
                </>
              )}
              {showDemo === 2 && (
                <>
                  <View style={{ height: 110, width: 100, marginLeft: 10 }} />
                  <View style={{ height: 110, width: 100 }} />
                  <RenderHealthTrackDemo item={healthTrackerDemo[2]} />
                </>
              )}
            </View>
          )}
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            DIABETES EDUCATION
          </Text> */}
          {showDemo === 3 && (
            <View
              style={{
                position: 'relative',
                zIndex: 33,
                marginHorizontal: 15,
              }}
            >
              <ImageBackground
                resizeMode="stretch"
                source={{
                  uri: 'http://s3-ap-southeast-1.amazonaws.com/assets.biomarking.com/videos/DE-Toujeo-thumbnail.jpg',
                }}
                style={styles.backgroundVideo}
              >
                <TouchableOpacity>
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
            </View>
          )}
          <View style={styles.videoView}>
            <FlatList
              data={video}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>

          {/* view to show pdf on top */}
          {showDemo !== 5 && (
            <View
              style={{
                position: 'relative',
                zIndex: showDemo === 4 ? 33 : 29,
                marginHorizontal: 15,
              }}
            >
              <PdfLink title="Diabetes Patient Manual" svg={<PdfSvg />} />
            </View>
          )}
          <FlatList
            data={pdfData}
            renderItem={(item) => (
              <PdfList
                item={item}
                onPress={() => {
                  navigate(SCREENS.PDF_DIABETES_SUPPORT, { code: item });
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />

          <WithdrawProgram
            text={t('pages.diabetesSupport.dialogs.withdraw.buttonText')}
            visible={modalVisible}
            title={t('pages.diabetesSupport.dialogs.withdraw.title')}
            text2={t('pages.diabetesSupport.dialogs.withdraw.description')}
            cancel={t(
              'pages.diabetesSupport.dialogs.withdraw.buttonCancelText'
            )}
            cancelModal={() => setModalVisible(!modalVisible)}
            closeModal={() => setModalVisible(!modalVisible)}
            onPress={() => onWithdraw()}
            color={['#2C6CFC', '#2CBDFC']}
          />

          <View style={styles.bottomTextView}>
            <Text style={[styles.bottomText, { color: colors.heading }]}>
              {t('pages.diabetesSupport.withdrawText')}{' '}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                style={[
                  styles.bottomText,
                  { color: colors.blue, textDecorationLine: 'underline' },
                ]}
              >
                {t('pages.diabetesSupport.withdrawLink')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* <TouchableWithoutFeedback onPress={() => openMessenger()}>
          <View style={styles.messengerView}>
            <Messenger />
          </View>
        </TouchableWithoutFeedback> */}
        {showDemo !== 5 && (
          <View style={styles.demobottomView}>
            <View style={styles.demoTextView}>
              {showDemo === 0 && (
                <Text style={styles.demoText}>
                  {t('pages.diabetesSupport.onboarding.demo.bloodSugar')}
                </Text>
              )}
              {showDemo === 1 && (
                <Text style={styles.demoText}>
                  {t('pages.diabetesSupport.onboarding.demo.medication')}
                </Text>
              )}
              {showDemo === 2 && (
                <Text style={styles.demoText}>
                  {t('pages.diabetesSupport.onboarding.demo.BbA1c')}
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
                  showDemo == 3 && scrollToView(700);
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
            {/* <View style={styles.demoButtonView}>
              <GradientButton
                text={showDemo === 4 ? 'Finish' : 'Next'}
                color={['#2C6CFC', '#2CBDFC']}
                style={styles.gradientButton2}
                onPress={() => {
                  setShowDemo((demo) => demo + 1),
                    showDemo == 2 && scrollToView(150);
                  showDemo == 3 && scrollToView(700);
                }}
              />
            </View> */}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* </View> */}
    </TitleWithBackLayout>
  );
};
export default DiabetesCenter;
