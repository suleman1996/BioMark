import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { BioDangerWhite } from 'components/svg';
import DropDown from 'react-native-paper-dropdown';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import makeStyles from './styles';

type Props = {
  options: any;
  selectedValue: string | number;
  onValueChange: (text: string) => void;
  error?: string;
  marginTop?: number;
  label: string;
};

const DropdownCountryCity = ({
  options,
  selectedValue,
  onValueChange,
  error,
  marginTop,
  label,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const ifMT = marginTop ? { height: heightToDp(marginTop) } : {};

  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <View style={[ifMT]}>
      {label && <Text style={[styles.label]}>{label}</Text>}

      <DropDown
        mode={'flat'}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={selectedValue}
        setValue={(text) => onValueChange(text)}
        list={options}
        inputProps={{
          style: {
            width: '100%',
            height: heightToDp(6),
            flex: 1,
            borderRadius: widthToDp(2),
            maxHeight: heightToDp(6.5),
            backgroundColor: colors.inputBg,
          },
          underlineColor: '#fff',
        }}
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

export default DropdownCountryCity;
