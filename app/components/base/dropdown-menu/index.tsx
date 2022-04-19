import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions';
import { GlobalColors } from '../../../utils/theme/globalColors';

type Props = {
  options: any;
  setSelectedDropdown: any
};

const DropdownMenuComponent = ({options, setSelectedDropdown}: Props) => {
  return (
    <View style={styles.container}>
      <Picker
        mode="dropdown"
        selectedValue={setSelectedDropdown}
        onValueChange={(itemValue: string, itemIndex: number) =>
          setSelectedDropdown(itemValue)
        }>
        {options?.map((item: any, index: number) => {
          return (
            <Picker.Item key={index} label={item.title} value={item.title} />
          );
        })}
      </Picker>
    </View>
  );
};

export default DropdownMenuComponent

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: heightToDp(6),
    backgroundColor: GlobalColors.gray,
    flex: 1,
    borderRadius: widthToDp(2),
    maxHeight: heightToDp(6.5)
  },
});