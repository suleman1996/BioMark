import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

import { BioDangerWhite } from 'components/svg';

import makeStyles from './styles';

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

  return (
    <View style={styles.container}>
      <Picker
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={(item) => onValueChange(item)}
      >
        {options?.map((item: any, index: number) => {
          return (
            <Picker.Item key={index} label={item.title} value={item.title} />
          );
        })}
      </Picker>
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
