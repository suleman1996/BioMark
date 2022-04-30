import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import colors from 'assets/colors';

type Props = {
  label: string;
  placeholder: string;
  height: number | string;
  textAlign: string | number;
  onChangeText: (text: string) => void;
};

const HeightChooserComponent = ({
  label,
  placeholder,
  height,
  textAlign,
  onChangeText,
}: Props) => {
  const menuRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(0);
  const [selectedType, setSelectedType] = useState(2);

  var otherStyle = [];
  if (height) {
    otherStyle.push({ height: heightToDp(height) });
  }
  if (textAlign) {
    otherStyle.push({ textAlign: textAlign });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rowContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.smoke}
          style={[styles.textFieldStyle, otherStyle]}
          theme={{ colors: { text: colors.smoke } }}
          onChangeText={onChangeText}
          value={value}
          autoFocus={false}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          borderBottomWidth={0}
        />
        <Menu ref={menuRef}>
          <MenuTrigger style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: GlobalColors.heading,
                fontFamily: GlobalFonts.bold,
                fontSize: responsiveFontSize(22),
              }}
            >
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
              ]}
            >
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
              ]}
            >
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
    color: colors.blue,
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
    // borderWidth: 1,
  },
  menuText: {
    fontSize: responsiveFontSize(20),
    padding: widthToDp(2),
  },
});
