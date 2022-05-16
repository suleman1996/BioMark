import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import Modal from 'react-native-modal';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

import makeStyles from './styles';

type Props = {
  isVisible: boolean;
  children: any;
  setIsVisible: any;
};

const ModalComponent = ({ isVisible, children, setIsVisible }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View>
      <Modal
        deviceWidth={widthToDp(100)}
        deviceHeight={heightToDp(100)}
        onBackdropPress={() => setIsVisible(false)}
        backdropColor={colors.transparentBlack}
        isVisible={isVisible}
      >
        <View style={styles.mainView}>{children}</View>
      </Modal>
    </View>
  );
};

export default ModalComponent;
