import React, { useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

import { ErrorMessage } from 'components/base';

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
  onBlur?: any;
  error?: string;
  small?: boolean;
  textAlign?: 'left' | 'right' | 'center';
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

const InputWithUnits = ({
  unit,
  onChangeText,
  value,
  onUnitChange,
  units,
  title,
  onBlur,
  placeholder,
  error,
  small,
  textAlign,
  labelStyle,
  inputStyle,
}: Props) => {
  const menuRef = useRef<any>();
  const { colors } = useTheme();
  const styles = makeStyles(colors, small, textAlign);

  return (
    <>
      <Text style={[styles.title, labelStyle || {}]}>{title}</Text>
      <View style={styles.mainView}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="grey"
          onChangeText={onChangeText}
          value={value}
          autoFocus={false}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          keyboardType="numeric"
          style={[styles.textInput, inputStyle || {}]}
          selectionColor="darkblue"
          onBlur={onBlur}
        />
        <Menu ref={menuRef}>
          <MenuTrigger style={styles.menuTrigger}>
            <Text style={styles.menuText}>{unit}</Text>

            <MaterialCommunityIcons
              name={small ? 'menu-down' : 'chevron-down'}
              size={responsiveFontSize(28)}
              color="grey"
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.optionContainer}>
            {units.map((unitValue) => (
              <Pressable
                key={unitValue}
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
      {error?.length > 0 ? <ErrorMessage errorMessage={error} /> : null}
    </>
  );
};
export default InputWithUnits;
