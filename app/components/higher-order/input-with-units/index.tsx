import { Text, View, Pressable } from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from 'react-native-paper';

import { TextInput } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';
import fonts from 'assets/fonts';
import { TargetUnit } from 'types/api';

type Props = {
  label: string;
  placeholder: string;
  height: number | string;
  textAlign: string | number;
  onChangeText: (text: string) => void;
  setSelectedType: any;
  selectedType: any;
  value: string;
  setValue: any;
  isSecond: boolean;
  isFirst: boolean;
  op1: string;
  units?: TargetUnit[];
};

const InputWithUnits = ({
  label,
  placeholder,
  height,
  textAlign,
  onChangeText,
  setSelectedType,
  selectedType,
  value,
  setValue,
  isSecond,
  isFirst,
  op1,
  units,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const menuRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
          keyboardType="numeric"
        />
        <Menu ref={menuRef}>
          <MenuTrigger
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: colors.smoke,
                fontFamily: fonts.mulishRegular,
                fontSize: responsiveFontSize(22),
                marginRight: 15,
              }}
            >
              {units
                ? units[selectedType]?.name
                : selectedType == 1
                ? op1
                  ? op1
                  : 'mg/dL'
                : 'mmol/L'}
            </Text>

            <MaterialCommunityIcons
              name="chevron-down"
              size={responsiveFontSize(30)}
              color={colors.smoke}
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.popupMenu}>
            {units ? (
              units.map((unit, index) => (
                <Pressable
                  onPress={() => {
                    setSelectedType(index);
                    selectedType != index && setValue(value.toString());
                    menuRef.current.close();
                  }}
                  style={[
                    styles.singleMenuItem,
                    selectedType == 1 ? { backgroundColor: colors.gray } : {},
                  ]}
                >
                  <Text style={styles.menuText}>{unit.name}</Text>
                </Pressable>
              ))
            ) : (
              <>
                {isFirst && (
                  <Pressable
                    onPress={() => {
                      setSelectedType(1);
                      selectedType != 1 && setValue(value.toString());
                      menuRef.current.close();
                    }}
                    style={[
                      styles.singleMenuItem,
                      selectedType == 1 ? { backgroundColor: colors.gray } : {},
                    ]}
                  >
                    <Text style={styles.menuText}>%</Text>
                  </Pressable>
                )}
                {isSecond && (
                  <>
                    <Pressable
                      onPress={() => {
                        setSelectedType(1);
                        selectedType != 1 && setValue(value.toString());
                        menuRef.current.close();
                      }}
                      style={[
                        styles.singleMenuItem,
                        selectedType == 1
                          ? { backgroundColor: colors.gray }
                          : {},
                      ]}
                    >
                      <Text style={styles.menuText}>mg/dL</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setSelectedType(2);
                        selectedType != 2 &&
                          setValue(parseInt(value).toString());
                        menuRef.current.close();
                      }}
                      style={[
                        styles.singleMenuItem,
                        selectedType == 2
                          ? { backgroundColor: colors.gray }
                          : {},
                      ]}
                    >
                      <Text style={styles.menuText}>mmol/L</Text>
                    </Pressable>
                  </>
                )}
              </>
            )}
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default InputWithUnits;
