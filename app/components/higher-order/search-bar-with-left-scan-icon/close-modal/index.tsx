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
  headerText: string;
  subHeading: string;
  buttonUpperText: string;
  buttonLowerText: string;
  skipToProceed?: any;
};

const CloseModal = (props: Props) => {
  const { isVisible, setIsVisible, subHeading, headerText, buttonUpperText } =
    props;

  const { colors } = useTheme();
  const styles = makeStyles(colors);
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
        <Button
          onPress={() => {
            setIsVisible(false);
          }}
          title={buttonUpperText}
          disabled={false}
        />
      </View>
    </Modal>
  );
};

export default CloseModal;
