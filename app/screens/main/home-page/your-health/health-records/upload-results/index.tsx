import React, { useState } from 'react';
import { Text, View, SafeAreaView, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import Feather from 'react-native-vector-icons/Feather';
import LabResultModal from 'components/lab-results-modal';

import makeStyles from './styles';

export default function ResultUpload() {
  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

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

        <Pressable
          style={styles.imageView}
          onPress={() => setModalVisible(true)}
        >
          <Feather color={colors.heading} name="plus" size={35} />
          <Text style={styles.addPage}>Add Page</Text>
        </Pressable>

        <LabResultModal
          visible={modalVisible}
          title="Upload Lab Results"
          closeModal={() => setModalVisible(!modalVisible)}
        />

        <ButtonWithShadowContainer title="Save & Continue" />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
}
