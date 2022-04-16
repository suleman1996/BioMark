import {StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import React, { useState } from 'react'
import { GlobalStyles } from './../../../utils/theme/globalStyles';
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions';
import { responsiveFontSize } from './../../../utils/functions/responsiveText';
import { GlobalColors } from './../../../utils/theme/globalColors';
import { GlobalFonts } from './../../../utils/theme/fonts';

const BoxSelector = ({options, label}) => {
  const [selected, setSelected] = useState('');
  const selectedStyles = {backgroundColor: GlobalColors.primary};
  const selectedTextStyle = {color: GlobalColors.white}
  return (
    <View style={styles.main}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <FlatList
        style={styles.container}
        horizontal
        data={options}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => setSelected(item)}
            key={index}
            style={[styles.button, selected == item ? selectedStyles : {}]}>
            <Text style={[selected == item ? selectedTextStyle : {}]}>
              {item}
            </Text>
          </Pressable>
        )}
      />
      {/* <View style={styles.container}>
        {options
          ? options.map((item, index) => (
              <Pressable
                onPress={() => setSelected(item)}
                key={index}
                style={[
                  styles.button,
                  {marginRight: widthToDp(2)},
                  selected == item ? selectedStyles : {}
                ]}>
                <Text style={[selected == item ? selectedTextStyle : {}]}>
                  {item}
                </Text>
              </Pressable>
            ))
          : null}
      </View> */}
    </View>
  );
}

export default BoxSelector

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: heightToDp(2),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: widthToDp(25),
    marginRight: widthToDp(3),
    borderRadius: widthToDp(2),
    height: heightToDp(5.5),
    ...GlobalStyles.shadow,
  },
  label: {
    fontSize: responsiveFontSize(22),
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.medium,
  },
});