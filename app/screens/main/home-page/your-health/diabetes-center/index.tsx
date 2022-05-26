import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';

import { TitleWithBackLayout } from 'components/layouts';
import RenderHealthTrack from 'components/health-tracker-card/index';
import PdfList from 'components/pdf-list';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import WithdrawProgram from 'components/widthdraw-from-program';
import Video from 'react-native-video';
import SCREENS from 'navigation/constants'; // import { useNavigation } from '@react-navigation/native';
// import Pdf from 'assets/svgs/pdf';
import Messenger from 'assets/svgs/messenger';
import { navigate } from 'services/nav-ref';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
const openMessenger = () => {
  Linking.openURL(
    'mailto:support@biomarking.com?subject=SendMail&body=Description'
  );
};

const DiabetesCenter = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();
  const styles = Styles(colors);
  //   const navigation = useNavigation();

  const [healthTracker] = React.useState([
    {
      id: 0,
      title: 'Blood Sugar',
      value: '5.5',
      subTitle: 'mg/dL',
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
      id: 1,
      title: 'HbA1c',
      value: '5.0',
      subTitle: '%',
      color: colors.green,
    },
    {
      id: 2,
      title: 'Weight',
      value: '56',
      subTitle: 'kg',
      color: colors.blue,
    },
  ]);

  const [Pdflist] = React.useState([
    {
      id: 1,
      title: 'Diabetes Patient Manual',
    },
    {
      id: 2,
      title: 'Diabetes Myths and Facts',
    },
    {
      id: 3,
      title: 'Diabetes Patient Manual',
    },
    {
      id: 4,
      title: 'Diabetes Patient Manual',
    },
  ]);

  return (
    <TitleWithBackLayout isGradient={true} title="Diabetes Support Center">
      <View style={styles.containerBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            YOUR DIABETES DIARY
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
            DIABETES EDUCATION
          </Text>

          <Video
            source={{
              uri: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
            }}
            controls={true}
            paused={true}
            style={styles.backgroundVideo}
            repeat={true}
            resizeMode="stretch"
            fullscreen={true}
            posterResizeMode={'cover'}
            poster="https://play-lh.googleusercontent.com/uf1TVrS58KmBNiWYR3LocIJMDXTmmfkYY79lDlG2eA4brjyw3q1BN4DDIriw7B9MfQ=w600-h300-pc0xffffff-pd"
            //   style={{ flex: 1, width: '100%', margin: 'auto' }}
          />

          <FlatList
            data={Pdflist}
            renderItem={(item) => (
              <PdfList
                item={item}
                onPress={() => navigate(SCREENS.PDF_DIABETES_SUPPORT)}
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
          <WithdrawProgram
            visible={modalVisible}
            title="Are You Sure?"
            text="Are you sure you want to withdraw from the Empower Program? You will lose access to all your Empower Program privileges."
            cancel="Cancel"
            cancelModal={() => setModalVisible(!modalVisible)}
            closeModal={() => setModalVisible(!modalVisible)}
          />

          <View style={styles.bottomTextView}>
            <Text style={[styles.bottomText, { color: colors.heading }]}>
              Tap to{' '}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
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

export default DiabetesCenter;
