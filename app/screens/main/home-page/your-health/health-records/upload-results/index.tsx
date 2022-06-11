/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  PermissionsAndroid,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WithdrawProgram from 'components/widthdraw-from-program';
import { TextInput } from 'components';
import SCREENS from 'navigation/constants';
import { ActivityIndicator } from 'components';

import LabResultModal from 'components/lab-results-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { userService } from 'services/user-service/user-service';
import DocumentPicker from 'react-native-document-picker';

import makeStyles from './styles';
import { navigate } from 'services/nav-ref';

let cameraIs = false;

export default function ResultUpload() {
  const [showModal, setShowModal] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pic, setPic] = React.useState([]);
  const [refresh, setRefreh] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [document, setDocument] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const [base64, setBase64] = useState('');
  const [splice, setSplice] = useState('');

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const addData = () => {
    pic.push(pic);
    setPic([...pic]);
  };

  const updateResults = async () => {
    try {
      setIsVisible(true);
      const profilePic = await userService.uploadResult({
        lab_upload: {
          name: document,
          attachments: [
            {
              filename: pic,
              base64: 'data:image/png;base64,' + base64,
              filetype: 'png,jpg',
            },
          ],
        },
      });
      if (profilePic.status == true) {
        console.log('profile--------------response----------', profilePic.data);
        navigate(SCREENS.HEALTH_RECORD);
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

  const imagePickerFromGallery = async () => {
    try {
      setIsVisible(true);
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
        launchImageLibrary(options, (res) => {
          if (res.didCancel) {
            setIsVisible(false);
            console.log('User cancelled image picker');
            cameraIs = false;
          } else if (res.errorMessage) {
            setIsVisible(false);
            console.log('ImagePicker Error: ', res.errorMessage);
            cameraIs = false;
          } else {
            setIsVisible(false);
            console.log('image a jaaaaaaaaaaaaa', res.assets[0].base64);
            setBase64(res.assets[0].base64);
            setPic(res.assets);
            setShowModal(!showModal);
            cameraIs = false;
          }
        });
        setIsVisible(false);
        console.log('Camera permission given');
      } else {
        setIsVisible(false);
        console.log('Camera permission denied');
      }
    } catch (err) {
      setIsVisible(false);
      console.warn(err);
    }
  };

  const uploadPDF = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      setPic(res);
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const imagePickerFromCamera = async () => {
    try {
      setIsVisible(true);
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
            console.log('User cancelled image picker');
            cameraIs = false;
          } else if (res.errorMessage) {
            setIsVisible(false);
            console.log('ImagePicker Error: ', res.errorMessage);
            cameraIs = false;
          } else {
            setIsVisible(false);
            console.log('image a jaaaaaaaaaaaaa', res.assets[0].base64);
            setBase64(res.assets[0].base64);
            setPic(res.assets);
            // setShowModal(!showModal);
            cameraIs = false;
          }
        });
        console.log('Camera permission given');
      } else {
        setIsVisible(false);
        console.log('Camera permission denied');
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
          <TitleWithBackLayout title="Upload Results">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
              <View style={styles.uploadView}>
                <Text style={styles.document}>Document Name</Text>
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
                <TextInput
                  value={document}
                  onChange={setDocument}
                  // defaultValue={'hello'}
                />
              </View>

              <View style={styles.uploadView}>
                <Text style={styles.uploadText}>Your Uploads</Text>
                <Text style={styles.numberText}>(0)</Text>
              </View>

              <View>
                <FlatList
                  data={pic}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  extraData={refresh}
                  columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                        <ImageBackground
                          imageStyle={{ borderRadius: 8 }}
                          source={{ uri: item.uri }}
                          style={styles.imageView2}
                        ></ImageBackground>
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
                      Your privacy is important to us. You are in control of
                      your health information. BioMark won’t provide your
                      information to any third parties without your permission.
                    </Text>
                    <Text style={styles.noteText2}>
                      BioMark only supports the uploading of lab results for
                      now. We reserve the right to remove documents that are not
                      related to lab results.
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <ButtonWithShadowContainer
              title="Save & Continue"
              disabled={document.length <= 0 ? true : false}
              onPress={() => updateResults()}
            />
          </TitleWithBackLayout>
        </>
      ) : (
        <TitleWithBackLayout title="Upload Results">
          <View style={styles.infoView}>
            <Feather color={colors.heading} name="info" size={25} />
            <Text style={styles.text}>
              For results with multiple pages, select Add Page to add more
              pages.
            </Text>
          </View>

          <View style={styles.uploadView}>
            <Text style={styles.uploadText}>Your Uploads</Text>
            <Text style={styles.numberText}>(0)</Text>
          </View>

          <View>
            <FlatList
              data={pic}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              extraData={refresh}
              columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <ImageBackground
                      imageStyle={{ borderRadius: 8 }}
                      source={{ uri: item.uri }}
                      style={styles.imageView2}
                    >
                      <MaterialCommunityIcons
                        name="delete"
                        color={colors.primary}
                        size={25}
                        style={styles.deleteIcon}
                        onPress={() => {
                          setSplice(pic.splice(index, 1), setRefreh(!refresh)),
                            setModalVisible(true);
                        }}
                      />
                    </ImageBackground>
                    <WithdrawProgram
                      text2="Delete"
                      visible={modalVisible}
                      title="Are You Sure?"
                      text="This action is final and cannot be reverted."
                      cancel="Cancel"
                      cancelModal={() => setModalVisible(!modalVisible)}
                      closeModal={() => setModalVisible(!modalVisible)}
                      color={['#EB3342', '#EB3342']}
                      onPress={() => {
                        pic.splice(index, 1), setRefreh(!refresh);
                      }}
                    />
                  </>
                );
              }}
            />
          </View>

          <Pressable
            style={styles.imageView}
            onPress={() => setShowModal(true)}
          >
            <Feather color={colors.heading} name="plus" size={35} />
            <Text style={styles.addPage}>Add Page</Text>
          </Pressable>
          {/* <WithdrawProgram
            text2="Delete"
            visible={modalVisible}
            title="Are You Sure?"
            text="This action is final and cannot be reverted."
            cancel="Cancel"
            cancelModal={() => setModalVisible(!modalVisible)}
            closeModal={() => setModalVisible(!modalVisible)}
            color={['#EB3342', '#EB3342']}
       
          /> */}

          <LabResultModal
            visible={showModal}
            title="Upload Lab Results"
            closeModal={() => setShowModal(!showModal)}
            onTakePhoto={() => imagePickerFromCamera()}
            onUploadFromGallery={() => imagePickerFromGallery()}
            onUploadPdf={() => uploadPDF()}
          />
          <ButtonWithShadowContainer
            title="Save & Continue"
            disabled={pic.length <= 0 ? true : false}
            onPress={() => setIsPreview(!isPreview)}
          />
        </TitleWithBackLayout>
      )}
    </SafeAreaView>
  );
}
