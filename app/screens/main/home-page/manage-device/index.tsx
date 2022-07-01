/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ArrowBack } from 'assets/svgs';
import SCREENS from 'navigation/constants/index';

import makeStyles from './styles';
import MyImage from 'assets/images';
import Device from './box';
import { TryvitalsService } from 'services/tryvitals-service/tryvitals-service';
import { ConnectedDevicesResponse } from 'types/auth/TryvitalsResponse';

const ManageDevice = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [deleteDevice, setDeleteDevice] = useState({});
  const [devices, setDevices] = useState<Array<ConnectedDevicesResponse>>([]);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const navigation = useNavigation();

  useEffect(() => {
    TryvitalsService.connectedDevices().then((response) =>
      setDevices(response)
    );
  }, []);

  const OpenLogCloseSign = () => {
    setModalVisible2(true);
    setModalVisible(false);
  };

  const unLinkDevice = () => {
    TryvitalsService.disconnectDevice({ provider: deleteDevice.name }).then(
      () => {
        let result = devices.filter((d) => d.id !== deleteDevice.id);
        setDevices(result);
        setModalVisible2(false);
      }
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBack fill={'#8493AE'} />
          </TouchableOpacity>
          <Text style={styles.navHeading}>Devices</Text>
        </View>
        <View style={styles.container2}>
          {devices && devices.length > 0 ? (
            <>
              <Text style={styles.text}>List of wearables connected</Text>

              {devices.map((d) => (
                <Device
                  device={d}
                  setModalVisible={setModalVisible}
                  setDeleteDevice={setDeleteDevice}
                />
              ))}
            </>
          ) : (
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Image source={MyImage.wearableIcon} />
              <Text style={styles.noDeviceHeader}>No Devices Connected</Text>
              <Text style={styles.noDeviceContent}>
                There are currently no devices connected, you can add your
                preferred devices by clicking on the button below.
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate(SCREENS.DEVICE_CONNECTION)}
        >
          <Text style={styles.buttonContent}>Add New Device</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={MyImage.warningIcon} />
            <Text style={styles.modalHeader}>
              Are you sure you wish to unlink {deleteDevice.name}?
            </Text>
            <Text style={styles.modalContent}>
              You will no longer receive data from this device
            </Text>
            <TouchableOpacity
              style={styles.unlinkContainer}
              onPress={OpenLogCloseSign}
            >
              <Text style={styles.unlinkContent}>Unlink device</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: 'center',
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.unlinkClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={MyImage.tickIcon} />
            <Text style={styles.unlinkSuccess}>
              Device unlinking successful
            </Text>
            <Text style={styles.relink}>
              You may relink your device at anytime
            </Text>
            <TouchableOpacity
              style={styles.unlinkConfirm}
              onPress={unLinkDevice}
            >
              <Text style={styles.unlinkConfirmed}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ManageDevice;
