import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalColors } from 'utils/theme/global-colors';

type Props = {
  options: any;
  selectedValue: string;
  onValueChange?: (text: string) => void;
};

const DropdownMenuComponent = ({
  options,
  selectedValue,
  onValueChange,
}: Props) => {
  return (
    <View style={styles.container}>
      <Picker
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {options?.map((item: any, index: number) => {
          return (
            <Picker.Item key={index} label={item.title} value={item.title} />
          );
        })}
      </Picker>
    </View>
  );
};

export default DropdownMenuComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: heightToDp(6),
    backgroundColor: GlobalColors.gray,
    flex: 1,
    borderRadius: widthToDp(2),
    maxHeight: heightToDp(6.5),
  },
});
