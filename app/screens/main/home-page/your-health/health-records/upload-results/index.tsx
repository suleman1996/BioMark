/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  PermissionsAndroid,
  ImageBackground,
  FlatList,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
// var RNFS = require('react-native-fs');
var RNFS = require('react-native-fs');

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WithdrawProgram from 'components/widthdraw-from-program';
import UploadSuccessModal from 'components/upload-successful-modal';
import ShowPicModal from 'components/show-upload-pic-modal';
import { TextInput } from 'components';
import SCREENS from 'navigation/constants';
import { ActivityIndicator } from 'components';
import { getReduxPastResult } from 'store/home/home-actions';
import LabResultModal from 'components/lab-results-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { userService } from 'services/user-service/user-service';
import DocumentPicker from 'react-native-document-picker';

import makeStyles from './styles';
import { navigate } from 'services/nav-ref';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from 'store/IAppState';
import Pdf from 'react-native-pdf';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { PERMISSIONS, check, request } from 'react-native-permissions';

// let cameraIs = false;
export default function ResultUpload() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefreh] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [document, setDocument] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const [splices, setSplices] = useState();
  const [list, setList] = useState([]);
  const [showPicModal, setShowPicModal] = useState(false);
  const [uploadSuccessModal, setUploadSuccessModal] = useState(false);
  const [uri, setUri] = useState('');
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const pastResult = useSelector(
    (state: IAppState) => state.home.getPastResultData
  );
  const updateResults = async () => {
    let body = {
      lab_upload: {
        name: document,
        attachments: list,
      },
    };
    try {
      setIsVisible(true);
      const profilePic = await userService.uploadResult(body);
      if (profilePic.status == true) {
        dispatch(getReduxPastResult());
        setUploadSuccessModal(true);
        Keyboard.dismiss();
      }
    } catch (error) {
      console.log(error);
      setIsVisible(false);
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

  const imagePickerFromGallery = async () => {
    try {
      setIsVisible(true);
      let options = {
        mediaType: 'photo',
        selectionLimit: 40,
        includeBase64: true,
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
      };
      launchImageLibrary(options, (res) => {
        if (res.didCancel) {
          setIsVisible(false);
        } else if (res.errorMessage) {
          setIsVisible(false);
        } else {
          setIsVisible(false);
          let data = [...list];
          res?.assets?.forEach((asset) => {
            data.push({
              filename: asset?.fileName,
              uri: asset?.uri,
              base64:
                'data:' + asset?.type + ';' + 'base64' + ',' + asset?.base64,
              filetype: asset?.type,
            });
          });

          // data.push(body);
          setList(data);
          setShowModal(!showModal);
        }
      });
    } catch (err) {
      setIsVisible(false);
      console.warn(err);
    }
  };

  const uploadPDF = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      //Printing the log realted to the file
      var b64 = await RNFS.readFile(res.uri, 'base64');
      let body = {
        filename: res?.name,

        base64: `data:application/pdf;base64,${b64}`,
        filetype: 'pdf',
      };
      let data = list;
      data.push(body);
      setList(data);
      setShowModal(false);
      //Setting the state to show single file attributes
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
      } else {
        //For Unknown Error
        // alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const permissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let options = {
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: true,
      };
      launchCamera(options, (res) => {
        if (res.didCancel) {
          setIsVisible(false);
        } else if (res.errorMessage) {
          setIsVisible(false);
        } else {
          setIsVisible(false);
          let body = {
            filename: res?.assets[0]?.fileName,
            uri: res?.assets[0]?.uri,
            base64:
              'data:' +
              res?.assets[0]?.type +
              ';' +
              'base64' +
              ',' +
              res?.assets[0]?.base64,
            filetype: res?.assets[0]?.type,
          };
          let data = list;
          data.push(body);
          setList(data);
          setShowModal(false);
        }
      });
    } else {
      setIsVisible(false);
    }
  };

  const permissionIos = async () => {
    setIsVisible(false);
    const res = await check(PERMISSIONS.IOS.CAMERA);

    if (res === 'granted') {
      let options = {
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: true,
      };
      launchCamera(options, (res) => {
        if (res.didCancel) {
          setIsVisible(false);
        } else if (res.errorMessage) {
          setIsVisible(false);
        } else {
          setIsVisible(false);
          let body = {
            filename: res?.assets[0]?.fileName,
            uri: res?.assets[0]?.uri,
            base64:
              'data:' +
              res?.assets[0]?.type +
              ';' +
              'base64' +
              ',' +
              res?.assets[0]?.base64,
            filetype: res?.assets[0]?.type,
          };
          let data = list;
          data.push(body);
          setList(data);
          setShowModal(false);
        }
      });
    } else if (res === 'denied') {
      const res2 = await request(PERMISSIONS.IOS.CAMERA);
      res2 === 'granted' ? permissionIos() : setIsVisible(false);
      console.log('check again results ', res2);
    }
  };

  const imagePickerFromCamera = async () => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    try {
      setIsVisible(true);

      if (Platform.OS === 'android') {
        permissionAndroid();
      } else {
        permissionIos();
      }
    } catch (err) {
      setIsVisible(false);
      console.warn(err);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isVisiable} />
      {isPreview ? (
        <>
          <TitleWithBackLayout title={t('pages.uploadResult.title')}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
              <View style={styles.uploadView}>
                <Text style={styles.document}>
                  {t('pages.uploadResult.documentName')}
                </Text>
              </View>
              <View
                style={[
                  styles.textinputView,
                  {
                    borderWidth: document ? 1 : null,
                    borderRadius: document ? 5 : null,
                  },
                ]}
              >
                <TextInput value={document} onChange={setDocument} />
              </View>
              <View style={styles.uploadView}>
                <Text style={styles.uploadText}>
                  {t('pages.uploadResult.uploads')}
                </Text>
                <Text style={styles.numberText}>
                  {list.length > 0 ? splices + 1 : '(0)'}
                </Text>
              </View>
              <View>
                <FlatList
                  data={list}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  extraData={refresh}
                  columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                        {item?.filetype === 'pdf' ? (
                          <Pdf
                            source={{
                              uri: item.base64,
                            }}
                            singlePage={true}
                            trustAllCerts={true}
                            style={styles.imageView2}
                          />
                        ) : (
                          <ImageBackground
                            imageStyle={{ borderRadius: 8 }}
                            source={{ uri: item?.uri }}
                            style={styles.imageView2}
                          />
                        )}
                      </>
                    );
                  }}
                />
              </View>
              <View style={styles.note}>
                <View style={{ flexDirection: 'row' }}>
                  <Feather
                    color={colors.heading}
                    name="info"
                    size={22}
                    style={{ marginTop: 10 }}
                  />
                  <View style={styles.noteView}>
                    <Text style={styles.noteText}>
                      {t('pages.uploadResult.privacy')}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <UploadSuccessModal
              text="Okay"
              visible={uploadSuccessModal}
              title="Upload Successful"
              text2="Your upload was successful and is now under review."
              color={['#1996D6', '#1996D6']}
              onPress={() => {
                dispatch(getReduxPastResult());
                navigate(SCREENS.HEALTH_RECORD);
                setUploadSuccessModal(false);
              }}
            />
            <ButtonWithShadowContainer
              title={t('pages.uploadResult.continue')}
              disabled={document.length <= 0 ? true : false}
              onPress={() => updateResults()}
            />
          </TitleWithBackLayout>
        </>
      ) : (
        <TitleWithBackLayout title={t('pages.uploadResult.title')}>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={styles.infoView}>
              <Feather color={colors.heading} name="info" size={25} />
              <Text style={styles.text}>{t('pages.uploadResult.info')}</Text>
            </View>
            <View style={styles.uploadView}>
              <Text style={styles.uploadText}>
                {t('pages.uploadResult.uploads')}
              </Text>
              <Text style={styles.numberText}>
                {list.length > 0 ? splices + 1 : '0'}
              </Text>
            </View>
            <View>
              <FlatList
                data={[...list, { id: 'add-new' }]}
                horizontal={false}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                extraData={refresh}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  if (item.id == 'add-new') {
                    return (
                      <Pressable
                        style={styles.imageView}
                        onPress={() => setShowModal(true)}
                      >
                        <Feather color={colors.heading} name="plus" size={35} />
                        <Text style={styles.addPage}>
                          {t('pages.uploadResult.addPage')}
                        </Text>
                      </Pressable>
                    );
                  }
                  setSplices(index);
                  setUri(item?.uri);
                  return (
                    <Pressable
                      onPress={() => {
                        setShowPicModal(true);
                        setModalData(item);
                      }}
                    >
                      {item?.filetype === 'pdf' ? (
                        <View>
                          <MaterialCommunityIcons
                            name="delete"
                            color={colors.primary}
                            size={25}
                            style={styles.pdfWithBin}
                            onPress={() => {
                              setModalVisible(true);
                            }}
                          />
                          <Pdf
                            source={{
                              uri: item?.base64,
                            }}
                            singlePage={true}
                            trustAllCerts={true}
                            style={styles.imageView2}
                          />
                        </View>
                      ) : (
                        <ImageBackground
                          imageStyle={{ borderRadius: 8 }}
                          source={{ uri: item?.uri }}
                          style={styles.imageView2}
                        >
                          <MaterialCommunityIcons
                            name="delete"
                            color={colors.primary}
                            size={25}
                            style={styles.deleteIcon}
                            onPress={() => {
                              setModalVisible(true);
                            }}
                          />
                        </ImageBackground>
                      )}
                    </Pressable>
                  );
                }}
              />
            </View>
            <WithdrawProgram
              text={t('pages.hba1cInput.dialogs.delete.buttonText')}
              visible={modalVisible}
              title={t('pages.labResultOverview.dialogs.delete.title')}
              text2={t('pages.uploadResult.dialogs.delete.description')}
              cancel={t(
                'pages.labResultOverview.dialogs.delete.buttonCancelText'
              )}
              cancelModal={() => setModalVisible(!modalVisible)}
              closeModal={() => setModalVisible(!modalVisible)}
              color={['#EB3342', '#EB3342']}
              onPress={() => {
                list.splice(splices, 1);
                setRefreh(!refresh);
                setModalVisible(false);
              }}
            />
            <ShowPicModal
              visible={showPicModal}
              modalData={modalData}
              onClose={() => setShowPicModal(false)}
            />

            <LabResultModal
              visible={showModal}
              title={t('pages.uploadResult.dialogs.upload.title')}
              closeModal={() => setShowModal(!showModal)}
              onTakePhoto={() => imagePickerFromCamera()}
              onUploadFromGallery={() => imagePickerFromGallery()}
              onUploadPdf={() => uploadPDF()}
            />
          </ScrollView>
          <ButtonWithShadowContainer
            title={t('pages.uploadResult.continue')}
            disabled={list.length <= 0 ? true : false}
            onPress={() => setIsPreview(!isPreview)}
          />
        </TitleWithBackLayout>
      )}
    </SafeAreaView>
  );
}
