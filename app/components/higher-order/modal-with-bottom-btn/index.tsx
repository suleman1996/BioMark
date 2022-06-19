import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';

import { Modal, ButtonWithShadowContainer } from 'components/base';

import makeStyles from './styles';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

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
          // contentContainerStyle={{ flexGrow: 0 }}
          keyboardShouldPersistTaps="always"
        >
          <View style={{ paddingBottom: heightToDp(13) }}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {children}
          </View>
        </ScrollView>
        <ButtonWithShadowContainer
          title="Save"
          style={{
            borderRadius: widthToDp(3),
          }}
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
