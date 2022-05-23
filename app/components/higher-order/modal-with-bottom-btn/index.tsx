import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';

import { Modal, ButtonWithShadowContainer } from 'components/base';

import makeStyles from './styles';

type Props = {
  isVisible: boolean;
  children: any;
  onPress: any;
  title: string;
  setIsVisible: any;
};

const ModalWithBottomBtn = ({
  isVisible,
  children,
  onPress,
  title,
  setIsVisible,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [isModal, setIsModal] = useState(isVisible);

  useEffect(() => {
    setIsModal(isVisible);
  }, [isVisible]);

  return (
    <Modal setIsVisible={setIsVisible} isVisible={isModal}>
      <View style={styles.card}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <Text style={styles.title}>{title}</Text>
          {children}
        </ScrollView>
        <ButtonWithShadowContainer
          title="Save"
          onPress={() => {
            setIsModal(false);
            onPress();
          }}
        />
      </View>
    </Modal>
  );
};

export default ModalWithBottomBtn;
