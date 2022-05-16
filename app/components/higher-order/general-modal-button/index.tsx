import React from 'react';
import { Text, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

type Props = {
  isSelected: boolean;
  title: string;
  setIsModal: any;
  isModal: boolean;
  drop: boolean;
  history: any;
  condition_id: any;
};

const GeneralModalButton = ({
  isSelected,
  title,
  setIsModal,
  isModal,
  drop,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const textColor = isSelected
    ? { color: colors.white }
    : { color: colors.lightGrey };

  const bgColor = isSelected
    ? { backgroundColor: colors.darkPrimary }
    : { backgroundColor: colors.white };

  return (
    <Pressable
      onPress={() => {
        setIsModal(true);
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

export default GeneralModalButton;
