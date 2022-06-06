import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect } from 'react';
// import Video from 'react-native-video';

import SCREENS from 'navigation/constants/index';
import { TitleWithBackLayout } from 'components/layouts';

import RenderHealthTrack from 'components/health-tracker-card/index';
import RenderHealthTrackDemo from 'components/health-tracker-card-demo/index';
import Config from 'react-native-config';

import Styles from './styles';
import { useTheme } from 'react-native-paper';
import PdfSvg from 'assets/svgs/pdf';
import Messenger from 'assets/svgs/messenger';
import { useNavigation } from '@react-navigation/native';
import GradientButton from 'components/linear-gradient-button';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
const openMessenger = () => {
  Linking.openURL(Config.MESSENGER_URL);
};

const HypertensionDiary = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  const { PDF_HYPERTENSION } = SCREENS;
  const navigation = useNavigation();

  const [showDemo, setShowDemo] = React.useState(false);

  useEffect(() => {
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
                <FlatList
                  style={{ alignSelf: 'center' }}
                  data={healthTracker}
                  renderItem={(item) => <RenderHealthTrack item={item} />}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  zIndex: [0, 1, 2].includes(showDemo) ? 33 : 29,
                  flexDirection: 'row',
                  top: 50,
                  left: 30,
                }}
              >
                {showDemo === 0 && (
                  <RenderHealthTrackDemo item={healthTracker[0]} />
                )}
                {showDemo === 1 && (
                  <>
                    <View style={{ height: 120, width: 110, marginLeft: 10 }} />
                    <RenderHealthTrackDemo item={healthTracker[1]} />
                  </>
                )}
                {showDemo === 2 && (
                  <>
                    <View style={{ height: 120, width: 110, marginLeft: 15 }} />
                    <View style={{ height: 120, width: 110 }} />
                    <RenderHealthTrackDemo item={healthTracker[2]} />
                  </>
                )}
              </View>
              <Text style={[styles.headingText, { marginVertical: 10 }]}>
                HYPERTENSION EDUCATION
              </Text>
              <View style={styles.videoView}>
                {/* <Video
        source={{
          uri: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
        }} // the video file
        controls={true}
        paused={true} // make it start
        style={styles.backgroundVideo} // any style you want
        repeat={true} // make it a loop
        resizeMode="cover"
        posterResizeMode={'cover'}
        fullScreen={true}
        poster="https://play-lh.googleusercontent.com/uf1TVrS58KmBNiWYR3LocIJMDXTmmfkYY79lDlG2eA4brjyw3q1BN4DDIriw7B9MfQ=w600-h300-pc0xffffff-pd"
        // style={{ width: '100%', margin: 'auto' }}
      /> */}
              </View>
              {/* view to show pdf on top */}
              <View
                style={{
                  position: 'relative',
                  zIndex: showDemo === 4 ? 33 : 29,
                }}
              >
                <PdfLink
                  title="What Do I Need To Know About Hypertension?"
                  svg={<PdfSvg />}
                  onPress={() => navigation.navigate(PDF_HYPERTENSION)}
                />
              </View>
              <PdfLink
                title="What Do I Check My Blood Pressure?"
                svg={<PdfSvg />}
                onPress={() => navigation.navigate(PDF_HYPERTENSION)}
              />
              <PdfLink
                title="Shaking The Salt To Manage My Blood Pressure"
                svg={<PdfSvg />}
                onPress={() => navigation.navigate(PDF_HYPERTENSION)}
              />
              <PdfLink
                title="Modify My Lifestyle Can Help Control My Blood Presure"
                svg={<PdfSvg />}
                onPress={() => navigation.navigate(PDF_HYPERTENSION)}
              />
              <PdfLink
                title="Tips on Accurately Measuring Your Blood Pressure At Home"
                svg={<PdfSvg />}
                onPress={() => navigation.navigate(PDF_HYPERTENSION)}
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
