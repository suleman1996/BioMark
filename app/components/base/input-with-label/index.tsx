import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { InputField } from 'components';
import { BioDangerWhite } from 'components/svg';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

type Props = {
  label: string;
  placeholder: string;
  labelFontSize?: number;
  onChange: any;
  value: string;
  onFocus?: any;
  error?: any;
  defaultValue: any;
};

const InputWithLabel = ({
  label,
  placeholder,
  onChange,
  labelFontSize,
  value,
  onFocus,
  error,
  defaultValue,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const ifLabelSize = labelFontSize
    ? { fontSize: responsiveFontSize(labelFontSize) }
    : {};

  return (
    <View style={styles.container}>
      <Text style={[styles.label, ifLabelSize]}>{label}</Text>
      <InputField
        onFocus={onFocus}
        placeholder={placeholder}
        onChange={onChange}
        svg={undefined}
        value={value}
        defaultValue={defaultValue}
      />
      {error ? (
        <View style={styles.errorContainer}>
          <BioDangerWhite width={3.5} height={3.5} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default InputWithLabel;
