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
import Messenger from 'assets/svgs/messenger';
import { navigate } from 'services/nav-ref';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { getReduxPspModules } from 'store/home/home-actions';
import Config from 'react-native-config';

const openMessenger = () => {
  Linking.openURL(Config.MESSENGER_URL);
};

const DiabetesCenter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfData, setPdfData] = useState([]);
  const [video, setVideo] = useState([]);
  const [healthTracker] = React.useState([]);
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const styles = Styles(colors);

  const pspModuleData = useSelector(
    (state: IAppState) => state.home.pspModuleData
  );
  const hell = useSelector((state: IAppState) => state.home.healthTracker);

  useEffect(() => {
    PspModuleData();
    handleHEalthTracker();
    console.log('Health diabetes api =======>', hell);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // const [healthTrackers] = React.useState([
  //   {
  //     id: 0,
  //     title: 'Blood Sugar',
  //     value: '5.5',
  //     subTitle: 'mg/dL',
  //     color: colors.lightYellow,
  //   },
  //   {
  //     id: 1,
  //     title: 'Medication',
  //     value: '-',
  //     subTitle: 'Add',
  //     color: colors.blue,
  //   },
  //   {
  //     id: 1,
  //     title: 'HbA1c',
  //     value: '5.0',
  //     subTitle: '%',
  //     color: colors.green,
  //   },
  //   {
  //     id: 2,
  //     title: 'Weight',
  //     value: '56',
  //     subTitle: 'kg',
  //     color: colors.blue,
  //   },
  // ]);

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

  return (
    <TitleWithBackLayout isGradient={true} title="Diabetes Support Center">
      <View style={styles.containerBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            YOUR DIABETES DIARY
          </Text>

          <FlatList
            data={healthTracker}
            renderItem={(item) => <RenderHealthTrack item={item} />}
            keyExtractor={(item) => item.index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          {/* <FlatList
            style={{ alignSelf: 'center' }}
            data={healthTracker}
            renderItem={(item) => <RenderHealthTrack item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}

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
                onPress={() => {
                  navigate(SCREENS.PDF_DIABETES_SUPPORT, { code: item });
                }}
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
