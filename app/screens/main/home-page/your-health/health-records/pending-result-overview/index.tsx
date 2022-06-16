import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';

import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReduxPendingResultOverview,
  getReduxPastResult,
} from 'store/home/home-actions';
import { useRoute } from '@react-navigation/native';

import Styles from './styles';
import { TitleWithBackLayout } from 'components/layouts';
import moment from 'moment';
import { ActivityIndicator } from 'components';

import DeleteButtonContainer from 'components/base/delete-button-with-container';
import WithdrawProgram from 'components/widthdraw-from-program';
import { userService } from 'services/user-service/user-service';
import SCREENS from 'navigation/constants';
import { showMessage } from 'react-native-flash-message';
import { navigate } from 'services/nav-ref';
import Pdf from 'react-native-pdf';

const PendingResultOverview = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const styles = Styles(colors);
  const dispatch = useDispatch();

  const [list, setList] = React.useState([]);
  const [splices, setSplices] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisiable, setIsVisible] = React.useState(false);

  const pendingResult = useSelector(
    (state: IAppState) => state.home.getPendingResultOverviewData
  );

  React.useEffect(() => {
    dispatch(getReduxPendingResultOverview(route?.params?.result?.lab_id));
    setList(pendingResult?.upload?.document_attachments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressDelete = async () => {
    try {
      setIsVisible(true);
      const result = await userService.deleteLabUploads(
        route.params.result.lab_id
      );
      if (result.status == true) {
        setModalVisible(false);
        dispatch(getReduxPastResult());
        navigate(SCREENS.YOUR_HEALTH);
        console.log('delte----------------------------------', result.data);
      }
    } catch (error) {
      setIsVisible(false);
      console.log(error);
      if (error.errMsg.status == '500') {
        setIsVisible(false);
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        setIsVisible(false);
        showMessage({
          message: error.errMsg.data.message,
          type: 'danger',
        });
      } else {
        setIsVisible(false);
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={isVisiable} />

      <TitleWithBackLayout
        shadow={colors.blue}
        title="Result Overview"
        deleteIcon={() => setModalVisible(true)}
      >
        <View style={[styles.container, { paddingHorizontal: 10 }]}>
          <View style={styles.topView}>
            <View style={styles.topView2}>
              <Image
                source={require('../../../../../../assets/images/home/pad.png')}
                style={styles.padImage}
              />
              <View>
                <Text style={styles.topViewText}>
                  {pendingResult?.upload?.name}
                </Text>
                <Text style={styles.topViewText2}>
                  {moment(pendingResult?.upload?.document_date).format(
                    'hh:mm a MMMM Do, YYYY'
                  )}
                </Text>
                <View style={styles.topView3}>
                  <View style={styles.topRoundView}></View>
                  <Text style={styles.topViewText3}>
                    {pendingResult?.upload?.app_tag_name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={styles.topView4}>
              <Feather name="info" color="red" size={20} />
              <Text style={styles.topViewText4}>
                {pendingResult?.upload?.document_caption}
              </Text>
            </View>

            <View style={styles.uploadView}>
              <Text style={styles.uploadText}>Your Uploads</Text>
              <Text style={styles.numberText}>
                {list?.length > 0 ? splices + 1 : '0'}
              </Text>
            </View>

            <View>
              <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  console.log('itemuuu', item);

                  setSplices(index);
                  return (
                    <>
                      {item?.file_type === 'pdf' ? (
                        <Pdf
                          source={{
                            uri: item?.document?.url,
                            cache: true,
                          }}
                          trustAllCerts={true}
                          style={styles.imageView2}
                        />
                      ) : (
                        <ImageBackground
                          imageStyle={{ borderRadius: 8 }}
                          source={{ uri: item?.document?.url }}
                          style={styles.imageView2}
                        ></ImageBackground>
                      )}
                    </>
                  );
                }}
              />
            </View>

            <WithdrawProgram
              text="Yes"
              visible={modalVisible}
              title="Are You Sure?"
              text2="Are you sure you want to delete this test result? This action can’t be undone."
              cancel="Cancel"
              cancelModal={() => setModalVisible(!modalVisible)}
              closeModal={() => setModalVisible(!modalVisible)}
              color={['#1B96D8', '#1B96D8']}
              onPress={() => onPressDelete()}
            />
          </ScrollView>
        </View>
        <DeleteButtonContainer
          title="Delete Upload"
          onPress={() => setModalVisible(true)}
          //   disabled={list.length <= 0 ? true : false}
        />
      </TitleWithBackLayout>
    </View>
  );
};

export default PendingResultOverview;
