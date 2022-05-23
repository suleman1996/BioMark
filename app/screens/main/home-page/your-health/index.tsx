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
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import Styles from './styles';
import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import { useTheme } from 'react-native-paper';
import { ArrowBack } from 'assets/svgs';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import SCREENS from 'navigation/constants/index';

import RenderHealthTrack from '../../../../components/health-tracker-card/index';
import LabResultProgressBar from '../../../../components/lab-result-pregress-bar/index';

import Heart from '../../../../assets/svgs/heart';
import Diabetes from '../../../../assets/svgs/diabtes';
import BP from '../../../../assets/svgs/bP';
import BMI from '../../../../assets/svgs/Bmi';
import Smoking from '../../../../assets/svgs/smoking';
import Drinking from '../../../../assets/svgs/Drinking';
import Stress from '../../../../assets/svgs/stress';
import Sleep from '../../../../assets/svgs/sleep';
import Health from '../../../../assets/svgs/Health';
import Progress from '../../../../assets/svgs/Progress';
import fonts from 'assets/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import {
  getReduxHealthTracker,
  getReduxDashboard,
  getHealthTrackerRisks,
} from 'store/home/home-actions';

const Index = () => {
  const { colors } = useTheme();

  const styles = Styles(colors);
  const { HYPERTENSION, HEALTH_PROGRESS } = SCREENS;
  // const { HEALTH_STRESS } = SCREENS;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const hell = useSelector((state: IAppState) => state.home.healthTracker);
  const dashboard = useSelector((state: IAppState) => state.home.dashboard);
  const healthRisk = useSelector((state: IAppState) => state.home.healthRisks);

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

  useEffect(() => {
    dispatch(getReduxHealthTracker());
    console.log('Health Trackeer api =======>', hell);
    dispatch(getReduxDashboard());
    console.log('Dashboard api =======>', dashboard);
    dispatch(getHealthTrackerRisks());
    console.log('healthRisk api =======>', healthRisk);
    setHealthRisksData(healthRisk);
    handleHEalthTracker();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
  const [currentPosition] = React.useState(2);
  const [stepIndicatorIcons] = React.useState([
    <Heart />,
    <Diabetes />,
    <BMI />,
    <BP />,
  ]);
  const [healthRisksData, setHealthRisksData] = React.useState([]);

  const [selectedHealthRisk, setSelectedHealthRisk] = React.useState();
  //   const [yourHealthRisk, setYourHealthRisk] = React.useState(false);

  const RenderHealthRiskView = ({ svg, color, healthRisks }) => (
    <>
      <TouchableOpacity
        onPress={() => setSelectedHealthRisk(healthRisks)}
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
        {svg}
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
    <View style={styles.highlightsView}>
      <ImageBackground
        style={{ flex: 1 }}
        // resizeMode="stretch"
        source={{ uri: item.image }}
      >
        <BlurView title={item.title} />
      </ImageBackground>
    </View>
  );

  const BlurView = ({ title }) => (
    <View style={styles.blurView}>
      <Text style={styles.highlightstext}>{title}</Text>
    </View>
  );

  const RenderHealthRisk = ({ description, name, card_status, onPress }) => (
    <Animated.View
      {...panResponder.panHandlers}
      style={[pan.getLayout(), styles.healthRisk]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Heart fill={colors.lightGrey} />
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

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}
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
              healthRisks={healthRisksData?.heart}
              color={colors.lightGreen}
              svg={<Heart />}
            />
            <RenderHealthRiskView
              color={colors.lightGreen}
              healthRisks={healthRisksData?.diabetes}
              svg={<Diabetes />}
            />
            <RenderHealthRiskView
              color={colors.lightGreen}
              healthRisks={healthRisksData?.bp}
              svg={<BP />}
            />
            <RenderHealthRiskView
              color={colors.lightYellow}
              healthRisks={healthRisksData?.bmi}
              svg={<BMI />}
            />
            <RenderHealthRiskView
              color={colors.lightGreen}
              healthRisks={healthRisksData?.smoking}
              svg={<Smoking />}
            />
            <RenderHealthRiskView
              color={colors.lightYellow}
              healthRisks={healthRisksData?.drinking}
              svg={<Drinking />}
            />
            <RenderHealthRiskView
              color={colors.lightGreen}
              healthRisks={healthRisksData?.stress}
              svg={<Stress />}
            />
            <RenderHealthRiskView
              color={colors.dangerRed}
              healthRisks={healthRisksData?.sleeping}
              svg={<Sleep />}
            />
          </View>
          {selectedHealthRisk && (
            <RenderHealthRisk
              onPress={() => console.log('xxx ', selectedHealthRisk)}
              name={selectedHealthRisk?.name}
              description={selectedHealthRisk?.description}
              card_status={selectedHealthRisk?.card_status}
            />
          )}
          <Text style={[styles.headingText, { marginVertical: 20 }]}>
            Health Trackers
          </Text>

          <FlatList
            data={healthTracker}
            renderItem={(item) => <RenderHealthTrack item={item} />}
            keyExtractor={(item) => item.id}
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
            onPress={() => console.log('xxxxxx')}
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
            <RenderCircle title="Health Records" svg={<Health />} />
            <RenderCircle
              title="Health Progress"
              svg={<Progress />}
              onPress={() => navigation.navigate(HEALTH_PROGRESS)}
            />
          </View>
          <View style={styles.resultStatusView}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.resultStatus}>Your Lab Result Status</Text>
              <Text style={[styles.barcode]}>Barcode CVD-UBCDLM</Text>
            </View>
            <LabResultProgressBar
              currentPosition={currentPosition}
              icons={stepIndicatorIcons}
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.resultStatus}>Processing</Text>
              <Text style={[styles.barcode]}>
                Your result is being processed by the lab. We'll let you know
                once it's done.
              </Text>
            </View>
          </View>
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

          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Index;
