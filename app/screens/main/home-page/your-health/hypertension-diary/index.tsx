import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

import SCREENS from 'navigation/constants/index';
import { TitleWithBackLayout } from 'components/layouts';

import RenderHealthTrack from 'components/health-tracker-card/index';
import Config from 'react-native-config';

import Styles from './styles';
import { useTheme } from 'react-native-paper';
import PdfSvg from 'assets/svgs/pdf';
import Messenger from 'assets/svgs/messenger';
import { useNavigation } from '@react-navigation/native';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
const openMessenger = () => {
  Linking.openURL(Config.MESSENGER_URL);
};

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  const { PDF_HYPERTENSION } = SCREENS;
  const navigation = useNavigation();

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
    <TitleWithBackLayout isGradient={true} title="Hypertension Support Center">
      <View style={styles.containerBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            YOUR HYPERTENSION DAIRY
          </Text>
          <FlatList
            style={{ alignSelf: 'center' }}
            data={healthTracker}
            renderItem={(item) => <RenderHealthTrack item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            HYPERTENSION EDUCATION
          </Text>
          <View style={styles.videoView}>
            <Video
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
            />
          </View>
          <PdfLink
            title="What Do I Need To Know About Hypertension?"
            // svg={<BP fill={colors.primary} />}
            svg={<PdfSvg />}
            onPress={() => navigation.navigate(PDF_HYPERTENSION)}
          />
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
              Tap to{' '}
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.bottomText,
                  { color: colors.blue, textDecorationLine: 'underline' },
                ]}
              >
                Withdraw from Program
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableWithoutFeedback onPress={() => openMessenger()}>
          <View style={styles.messengerView}>
            <Messenger />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TitleWithBackLayout>
  );
};

export default Index;
