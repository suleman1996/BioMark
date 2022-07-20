import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Button, Modal } from 'components/base';
import { BioCloseGray } from 'components/svg';
import SCREENS from 'navigation/constants';

import { useNavigation } from '@react-navigation/native';

import makeStyles from './styles';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
  callMe: any;
  headerText: string;
  subHeading: string;
  buttonUpperText: string;
  buttonLowerText: string;
  skipToProceed?: any;
};

const AccountDeActivateModal = (props: Props) => {
  const {
    isVisible,
    setIsVisible,
    callMe,
    subHeading,
    headerText,
    buttonUpperText,
    buttonLowerText,
    skipToProceed,
  } = props;

  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();
  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Pressable onPress={() => setIsVisible(false)}>
            <BioCloseGray width={4} height={4} />
          </Pressable>
        </View>
        <Text style={styles.contentText}>{subHeading}</Text>
        <Button onPress={callMe} title={buttonUpperText} disabled={false} />
        <Button
          bg={'transparent'}
          color={'gray'}
          onPress={() => {
            skipToProceed
              ? navigation.navigate(SCREENS.BLOOD_SUGAR)
              : setIsVisible(false);
          }}
          title={buttonLowerText}
          disabled={false}
          style={{ marginTop: 10, borderWidth: 0 }}
        />
      </View>
    </Modal>
  );
};

export default AccountDeActivateModal;
