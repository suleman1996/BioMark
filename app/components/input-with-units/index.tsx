import React, { useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme, TextInput } from 'react-native-paper';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

type Props = {
  unit: string;
  onChangeText: any;
  value: string;
  onUnitChange: any;
  units: string[];
  title: string;
  placeholder: string;
};

const InputWithUnits = ({
  unit,
  onChangeText,
  value,
  onUnitChange,
  units,
  title,
  placeholder,
}: Props) => {
  const menuRef = useRef<any>();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.mainView}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="grey"
          onChangeText={onChangeText}
          value={value}
          autoFocus={false}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          borderBottomWidth={0}
          keyboardType="numeric"
          style={styles.textInput}
          selectionColor="darkblue"
        />
        <Menu ref={menuRef}>
          <MenuTrigger style={styles.menuTrigger}>
            <Text style={styles.menuText}>{unit}</Text>

            <MaterialCommunityIcons
              name="chevron-down"
              size={responsiveFontSize(28)}
              color="grey"
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.optionContainer}>
            {units.map((unitValue) => (
              <Pressable
                onPress={() => {
                  onUnitChange(unitValue);
                  menuRef.current.close();
                }}
              >
                <Text style={styles.unit}>{unitValue}</Text>
              </Pressable>
            ))}
          </MenuOptions>
        </Menu>
      </View>
    </>
  );
};
export default InputWithUnits;
