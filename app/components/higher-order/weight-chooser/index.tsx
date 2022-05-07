import React, { useState, useRef } from 'react';
import { Text, View, Pressable } from 'react-native';

import { TextInput } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import colors from 'assets/colors';

import { styles } from './styles';

type Props = {
  label: string;
  placeholder: string;
  height: number;
  textAlign: string;
  onChangeText: () => void;
};

const WeightChooserComponent = ({
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
          theme={{ colors: { text: colors.smoke } }}
          style={[styles.textFieldStyle, otherStyle]}
          onChangeText={onChangeText}
          value={value}
          autoFocus={false}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          borderBottomWidth={0}
          keyboardType="numeric"
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
              {selectedType == 1 ? 'lbs' : 'kg'}
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
              <Text style={styles.menuText}>lbs</Text>
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
              <Text style={styles.menuText}>kg</Text>
            </Pressable>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default WeightChooserComponent;
