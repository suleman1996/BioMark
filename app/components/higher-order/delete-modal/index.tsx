import { Text, View, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { Modal } from 'components/base';

import makeStyles from './styles';

type Props = {
  heading: string;
  isVisible: boolean;
  setIsVisible: any;
  subHeading: string;
  callMe: any;
};

const DeleteModalComponent = ({ isVisible, setIsVisible, callMe }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Text style={styles.heading}>Delete Dependant?</Text>
        <Text style={styles.subHeading}>
          Are you sure you want to delete profiles
        </Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => {
              setIsVisible(false);
              callMe();
            }}
            style={styles.yesBtn}
          >
            <Text style={styles.yesBtnText}>Yes</Text>
          </Pressable>
          <Pressable onPress={() => setIsVisible(false)} style={styles.noBtn}>
            <Text style={styles.noBtnText}>No</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModalComponent;
