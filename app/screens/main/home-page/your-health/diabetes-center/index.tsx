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
import PdfList from 'components/pdf-list';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import WithdrawProgram from 'components/widthdraw-from-program';
import SCREENS from 'navigation/constants';
// import { useNavigation } from '@react-navigation/native';
// import Pdf from 'assets/svgs/pdf';
import Messenger from 'assets/svgs/messenger';
import { navigate } from 'services/nav-ref';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { getReduxPspModules } from 'store/home/home-actions';
// import { Image } from 'react-native-svg';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
const openMessenger = () => {
  Linking.openURL(
    'mailto:support@biomarking.com?subject=SendMail&body=Description'
  );
};

const DiabetesCenter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfData, setPdfData] = useState([]);
  const [video, setVideo] = useState([]);
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const styles = Styles(colors);

  const pspModuleData = useSelector(
    (state: IAppState) => state.home.pspModuleData
  );
  //pdf & video data
  // const pspPdfLinks = useSelector(
  //   (state: IAppState) => state.home.PspDataContents
  // );
  useEffect(() => {
    PspModuleData();
  });

  const PspModuleData = () => {
    try {
      dispatch(getReduxPspModules());
      setPdfData(pspModuleData.pdf);
      // console.log('ps--------------------p', pspModuleData);
      setVideo(pspModuleData.video);
    } catch (err) {
      console.log(err);
    }
  };

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

  const renderItem = ({ item }) => (
    <>
      {console.log(item, '---------------item-------------------')}
      <ImageBackground
        resizeMode="stretch"
        source={{ uri: item.thumbnail }}
        style={styles.backgroundVideo}
      >
        <TouchableOpacity
          onPress={() => navigate(SCREENS.VIDEO_LIST, { code: item })}
        >
          <Image
            source={require('../../../../../assets/images/home/GD.png')}
            style={{
              height: 30,
              width: 30,
              // justifyContent: 'center',
              // alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'red',
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
    </>
  );

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

          <FlatList
            data={video}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />

          <FlatList
            data={pdfData}
            renderItem={(item) => (
              <PdfList
                item={item}
                onPress={() =>
                  navigate(SCREENS.PDF_DIABETES_SUPPORT, { code: item })
                }
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
