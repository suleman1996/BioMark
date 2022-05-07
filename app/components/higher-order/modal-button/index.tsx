import { Text, Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { styles } from './styles';

type Props = {
  title: string;
  setIsModal: any;
  isModal: boolean;
  drop: boolean;
};

const ModalButtonComponent = ({
  title,
  setIsModal,
  isModal,
  drop,
  history,
  condition_id,
}: Props) => {
  const textColor = isModal
    ? { color: GlobalColors.white }
    : { color: GlobalColors.lightGrey };
  const bgColor = isModal
    ? { backgroundColor: GlobalColors.darkPrimary }
    : { backgroundColor: GlobalColors.white };

  return (
    <Pressable
      onPress={() => {
        setIsModal(!isModal);
        if (!isModal) {
          history.push({
            condition_id: condition_id,
            medical_type: 'family',
            has_condition: true,
          });
        } else {
          history.splice(
            history.map((object) => object.condition_id).indexOf(condition_id),
            1
          );
        }
      }}
      style={[styles.container, bgColor]}
    >
      <Text numberOfLines={1} style={[styles.label, textColor]}>
        {title}
      </Text>
      {drop ? (
        <MaterialCommunityIcons
          size={responsiveFontSize(20)}
          name="chevron-down"
          color={isModal ? GlobalColors.white : 'black'}
        />
      ) : null}
    </Pressable>
  );
};

export default ModalButtonComponent;
