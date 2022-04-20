import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRef } from 'react';
import { GlobalFonts } from '../../../utils/theme/fonts';
import { GlobalColors } from '../../../utils/theme/globalColors';
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions';
import { responsiveFontSize } from '../../../utils/functions/responsiveText';
import InputField from '../../input-field/input-field'
import colors from '../../../assets/colors/colors';

const HeightChooserComponent = ({ label, placeholder, height, textAlign,onChangeText }) => {
  const menuRef = useRef();
  const [value, setValue] = useState(0);
  const [selectedType, setSelectedType] = useState(1);

  var otherStyle = [];
  if (height) {
    otherStyle.push({ height: heightToDp(height) });
  }
  if (textAlign) {
    otherStyle.push({ textAlign: textAlign });
  }
  const convertedCentoFeet = (values = 30) => {
    setValue(values);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rowContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.placeHolder}
          style={[styles.textFieldStyle, otherStyle]}
          //   keyboardType={'email-address'}
          onChangeText={onChangeText}
          value={value}
          autoFocus={true}
          underlineColor="transparent"
          activeUnderlineColor='transparent'
          borderBottomWidth={0}
        />
        <Menu ref={menuRef}>
          <MenuTrigger style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: GlobalColors.primary,
                fontFamily: GlobalFonts.regular,
                fontSize: responsiveFontSize(20),
              }}>
              {selectedType == 1 ? 'ft/in' : 'cm'}
            </Text>

            <MaterialCommunityIcons
              name="chevron-down"
              size={responsiveFontSize(28)}
              color={GlobalColors.darkPrimary}
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.popupMenu}>
            <Pressable
              onPress={() => {
                setSelectedType(1);
                menuRef.current.close();
              }}
              style={[
                styles.singleMenuItem,
                selectedType == 1 ? { backgroundColor: GlobalColors.gray } : {},
              ]}>
              <Text style={styles.menuText}>ft/in</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedType(2);
                menuRef.current.close();
              }}
              style={[
                styles.singleMenuItem,
                selectedType == 2 ? { backgroundColor: GlobalColors.gray } : {},
              ]}>
              <Text style={styles.menuText}>cm</Text>
            </Pressable>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HeightChooserComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  label: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
  textFieldStyle: {
    fontSize: responsiveFontSize(40),
    width: '80%',
    color: '#3D3D3D',
    // marginHorizontal: 10,
    backgroundColor: GlobalColors.gray,
    fontFamily: GlobalFonts.bold,
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: GlobalColors.gray,
    alignItems: 'center',
    borderRadius: widthToDp(2),
  },
  popupMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthToDp(25),
  },
  singleMenuItem: {
    width: '100%',
    width: widthToDp(25),
  },
  menuText: {
    fontSize: responsiveFontSize(20),
    padding: widthToDp(2),
  },
});
