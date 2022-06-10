/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Text, View, SafeAreaView, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import Feather from 'react-native-vector-icons/Feather';
import LabResultModal from 'components/lab-results-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { userService } from 'services/user-service/user-service';

import makeStyles from './styles';

let cameraIs = false;

export default function ResultUpload() {
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const updateProfilePhoto = async (pic: any) => {
    try {
      setIsLoading(true);
      const [profilePic] = await Promise.all([
        userService.updateProfileAvatar(pic),
      ]);
      console.log('profile success ', profilePic.data);

      const result = await userService.getUserProfile();
      authContext.setUserData(result.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const imagePickerFromGallery = () => {
    setShowModal(false);
    if (!cameraIs) {
      cameraIs = true;
      let options = {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: true,
      };
      launchImageLibrary(options, (res) => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
          cameraIs = false;
        } else if (res.errorMessage) {
          console.log('ImagePicker Error: ', res.errorMessage);
          cameraIs = false;
        } else {
          updateProfilePhoto(res.assets[0].base64);
          setEdit(false);
          cameraIs = false;
        }
      });
    }
  };

  const imagePickerFromCamera = () => {
    setShowModal(false);
    if (!cameraIs) {
      cameraIs = true;

      let options = {
        mediaType: 'photo',
        includeBase64: true,
      };
      launchCamera(options, (res) => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
          cameraIs = false;
        } else if (res.errorMessage) {
          console.log('Camera error: ', res.errorMessage);
          cameraIs = false;
        } else {
          updateProfilePhoto(res.assets[0].base64);
          setEdit(false);
          cameraIs = false;
        }
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackLayout title="Upload Results">
        <View style={styles.infoView}>
          <Feather color={colors.heading} name="info" size={25} />
          <Text style={styles.text}>
            For results with multiple pages, select Add Page to add more pages.
          </Text>
        </View>

        <View style={styles.uploadView}>
          <Text style={styles.uploadText}>Your Uploads</Text>
          <Text style={styles.numberText}>(0)</Text>
        </View>

        <Pressable style={styles.imageView} onPress={() => setShowModal(true)}>
          <Feather color={colors.heading} name="plus" size={35} />
          <Text style={styles.addPage}>Add Page</Text>
        </Pressable>

        <LabResultModal
          visible={showModal}
          title="Upload Lab Results"
          closeModal={() => setShowModal(!showModal)}
          onTakePhoto={() => imagePickerFromCamera()}
          onUploadFromGallery={() => imagePickerFromGallery()}
          onUploadPdf={undefined}
        />

        <ButtonWithShadowContainer title="Save & Continue" />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
