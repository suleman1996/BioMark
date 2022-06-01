import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import { BioDangerWhite } from 'components/svg';

import { makeStyles } from './styles';
import { GlobalStyles } from 'utils/theme/global-styles';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

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
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <View style={styles.parent}>
      <Text style={GlobalStyles(colors).question}>{question}</Text>
      <View style={styles.container}>
        {/* <Picker
          mode="dropdown"
          selectedValue={selectedValue}
          onValueChange={(item) => onValueChange(item)}
        >
          {options?.map((item: any, index: number) => {
            return <Picker.Item key={index} label={item} value={item} />;
          })}
        </Picker> */}
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
    </View>
  );
};

export default DropdownMenuWithQuestion;
