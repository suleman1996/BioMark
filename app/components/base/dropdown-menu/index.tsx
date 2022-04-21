import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions';
import { GlobalColors } from '../../../utils/theme/globalColors';

const DropdownMenuComponent = ({options, setSelectedDropdown,onValueChange}) => {
  return (
    <View style={styles.container}>
      <Picker
        mode="dropdown"
        selectedValue={setSelectedDropdown}
        // onValueChange={(itemValue, itemIndex) =>
        //   setSelectedLanguage(itemValue)
        // }
        onValueChange={onValueChange}
        >
        {options?.map((item, index) => {
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
    maxHeight: heightToDp(6.5),
  
  },
});