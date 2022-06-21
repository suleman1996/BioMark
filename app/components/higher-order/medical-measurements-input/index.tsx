import { View } from 'react-native';
import React from 'react';
import { useTheme, TextInput } from 'react-native-paper';

import { heightToDp } from 'utils/functions/responsive-dimensions';

import makeStyles from './styles';

type Props = {
  placeholder: string;
  height: number | string;
  width: number | string;
  textAlign: string | number;
  onChangeText: (text: string) => void;
  value: string;
  maxLength: number;
  defaultValue: string;
  selectionColor: string;
};

const MedicalInput = ({
  placeholder,
  height,
  width,
  textAlign,
  onChangeText,
  value,
  selectionColor,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  var otherStyle = [];

  if (height) {
    otherStyle.push({ height: heightToDp(height) });
  }
  if (width) {
    otherStyle.push({ width: width });
  }

  if (textAlign) {
    otherStyle.push({ textAlign: textAlign, flex: 1 });
  }
  return (
    <View style={styles.rowContainer}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.smoke}
        style={[styles.textFieldStyle, otherStyle]}
        theme={{ colors: { text: colors.smoke } }}
        // onChangeText={onChangeText}
        // onChange={(e) => console.log('onchange', e)}
        onChangeText={(e) => onChangeText(e)}
        value={value}
        // defaultValue={defaultValue}
        autoFocus={false}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        borderBottomWidth={0}
        keyboardType="numeric"
        selectionColor={selectionColor}
        // maxLength={maxLength}
      />
      {/* <Text style={styles.label}>%</Text> */}
    </View>
  );
};

export default MedicalInput;
