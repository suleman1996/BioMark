import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Modal, ButtonWithShadowContainer } from 'components/base';

import { styles } from './styles';

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
  const [isModal, setIsModal] = useState(isVisible);

  useEffect(() => {
    setIsModal(isVisible);
  }, [isVisible]);
  return (
    <Modal setIsVisible={setIsVisible} isVisible={isModal}>
      <View style={styles.card}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
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
