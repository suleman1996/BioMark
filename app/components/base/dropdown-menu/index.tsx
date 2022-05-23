import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import DropDown from 'react-native-paper-dropdown';
import { BioDangerWhite } from 'components/svg';

import makeStyles from './styles';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

type Props = {
  options: any;
  selectedValue: string;
  onValueChange: (text: string) => void;
  error?: string;
};

const DropdownMenuComponent = ({
  options,
  selectedValue,
  onValueChange,
  error,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <View>
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

export default DropdownMenuComponent;
