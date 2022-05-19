import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';
import React from 'react';
import Styles from './styles';
import { SearchBarWithLeftScanIcon } from 'components/higher-order';
import { useTheme } from 'react-native-paper';
import { ArrowBack } from 'assets/svgs';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

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

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigation = useNavigation();

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

  const [healthTracker] = React.useState([
    {
      id: 0,
      title: 'Blood Sugar',
      value: 2.0,
      subTitle: 'mg/dL',
      color: colors.blue,
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
      title: 'Blood Pressure',
      value: '75/30',
      subTitle: 'mmHg',
      color: colors.dangerRed,
    },
    {
      id: 3,
      title: 'Blood Sugar',
      value: 2.0,
      subTitle: 'mg/dL',
      color: colors.blue,
    },
  ]);
  const [currentPosition] = React.useState(2);
  const [stepIndicatorIcons] = React.useState([
    <Heart />,
    <Diabetes />,
    <BMI />,
    <BP />,
  ]);

  const RenderHealthRiskView = ({ svg, color }) => (
    <>
      <TouchableOpacity
        style={[styles.renderHealthRisk, { backgroundColor: color }]}
      >
        {svg}
      </TouchableOpacity>
      <View style={styles.dot} />
    </>
  );

  const RenderRecordKeeping = ({ title, id, svg }) => (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={['#2C6CFC', '#2CBDFC']}
      style={styles.recordKeepingView}
    >
      {svg}
      <Text style={[styles.recordKeepinText, { marginTop: 10 }]}>{title}</Text>
      <Text
        style={[
          styles.recordKeepinText,
          { fontSize: 14, fontFamily: fonts.light, marginBottom: 10 },
        ]}
      >
        Empower ID: {id}
      </Text>
    </LinearGradient>
  );

  const RenderLastResult = ({ title, date, svg }) => (
    <View style={[styles.recordKeepingView, { backgroundColor: colors.white }]}>
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
    </View>
  );

  const RenderCircle = ({ svg, title }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={styles.circle}>{svg}</TouchableOpacity>
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
            <RenderHealthRiskView color={colors.lightGreen} svg={<Heart />} />
            <RenderHealthRiskView
              color={colors.lightGreen}
              svg={<Diabetes />}
            />
            <RenderHealthRiskView color={colors.lightGreen} svg={<BP />} />
            <RenderHealthRiskView color={colors.lightYellow} svg={<BMI />} />
            <RenderHealthRiskView color={colors.lightGreen} svg={<Smoking />} />
            <RenderHealthRiskView
              color={colors.lightYellow}
              svg={<Drinking />}
            />
            <RenderHealthRiskView color={colors.lightGreen} svg={<Stress />} />
            <RenderHealthRiskView color={colors.dangerRed} svg={<Sleep />} />
          </View>
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
          />
          <RenderRecordKeeping
            svg={<BP />}
            title="Enter Diabetes Support Center"
            id="4y6yb5y5yb56b56y"
          />
          <RenderLastResult
            title="Your Last Result"
            date={'Dec 12 2022'}
            svg={<BP fill={colors.blue} />}
          />
          <View style={styles.circleView}>
            <RenderCircle title="Health Records" svg={<Health />} />
            <RenderCircle title="Health Progress" svg={<Progress />} />
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
