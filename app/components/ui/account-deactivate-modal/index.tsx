import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Button, Modal } from 'components/base';
import { BioCloseGray } from 'components/svg';

import makeStyles from './styles';

type Props = {
  isVisible: boolean;
  setIsVisible: any;
  callMe: any;
};

const AccountDeActivateModal = (props: Props) => {
  const { isVisible, setIsVisible, callMe } = props;

  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Are You Sure?</Text>
          <Pressable onPress={() => setIsVisible(false)}>
            <BioCloseGray width={4} height={4} />
          </Pressable>
        </View>
        <Text style={styles.contentText}>
          Are you sure you would like to deactivate your BioMark account?
        </Text>
        <Button onPress={callMe} title={'Confirm'} disabled={false} />
        <Button
          bg={'transparent'}
          color={'gray'}
          onPress={() => setIsVisible(false)}
          title={'Not Now'}
          disabled={false}
        />
      </View>
    </Modal>
  );
};

export default AccountDeActivateModal;
