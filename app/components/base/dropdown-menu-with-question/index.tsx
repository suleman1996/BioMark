/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { BioDangerWhite } from 'components/svg';

import { makeStyles } from './styles';
import { GlobalStyles } from 'utils/theme/global-styles';
import TextInputDropdown from 'components/text-input-dropdown';

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
  const styles = makeStyles(colors);
  const [dropdown, setDropdown] = useState([]);

  useEffect(() => {
    let arr = [];
    options.map((ele) => {
      arr.push({ value: ele });
    });
    setDropdown(arr);
  }, []);

  return (
    <View style={styles.parent}>
      <Text style={GlobalStyles(colors).question}>{question}</Text>
      <View style={styles.container}>
        <TextInputDropdown
          onChangeText={(item) => onValueChange(item)}
          value={selectedValue ? selectedValue : dropdown[0]?.value}
          disabled={undefined}
          dropdownData={dropdown}
        />

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
