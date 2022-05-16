import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import { BioDangerWhite } from 'components/svg';

import { styles } from './styles';
import { GlobalStyles } from 'utils/theme/global-styles';

type Props = {
  options: any;
  selectedValue: string;
  onValueChange: (text: string) => void;
  error?: string;
  question?: string;
};

const DropdownMenuWithQuestion = ({
  options,
  selectedValue,
  onValueChange,
  error,
  question,
}: Props) => {
  const { colors } = useTheme();
  return (
    <View style={styles.parent}>
      <Text style={GlobalStyles(colors).question}>{question}</Text>
      <View style={styles.container}>
        <Picker
          mode="dropdown"
          selectedValue={selectedValue}
          onValueChange={(item) => onValueChange(item)}
        >
          {options?.map((item: any, index: number) => {
            return <Picker.Item key={index} label={item} value={item} />;
          })}
        </Picker>
        {error ? (
          <View style={styles.errorContainer}>
            <BioDangerWhite width={3.5} height={3.5} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default DropdownMenuWithQuestion;
