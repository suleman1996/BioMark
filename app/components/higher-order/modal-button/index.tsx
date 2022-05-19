import React from 'react';
import { Text, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

type Props = {
  title: string;
  setIsModal: any;
  isModal: boolean;
  drop: boolean;
  history: any;
  condition_id: any;
};

const ModalButtonComponent = ({
  title,
  setIsModal,
  isModal,
  drop,
  history = [],
  condition_id,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const textColor = isModal
    ? { color: colors.white }
    : { color: colors.lightGrey };

  const bgColor = isModal
    ? { backgroundColor: colors.darkPrimary }
    : { backgroundColor: colors.white };

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
          color={isModal ? colors.white : 'black'}
        />
      ) : null}
    </Pressable>
  );
};

export default ModalButtonComponent;
