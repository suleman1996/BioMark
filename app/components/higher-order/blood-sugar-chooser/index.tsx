import { Text, View, Pressable } from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from 'react-native-paper';

import { TextInput } from 'react-native-paper';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

type Props = {
  label: string;
  placeholder: string;
  height: number | string;
  width: number | string;
  textAlign: string | number;
  onChangeText: (text: string) => void;
  setSelectedType: any;
  selectedType: any;
  value: string;
  setValue: any;
};

const BloodSugarChooser = ({
  label,
  placeholder,
  height,
  width,
  textAlign,
  onChangeText,
  setSelectedType,
  selectedType,
  value,
  setValue,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const menuRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [value, setValue] = useState(0);
  // const [selectedType, setSelectedType] = useState(2);

  var otherStyle = [];

  if (height) {
    otherStyle.push({ height: heightToDp(height) });
  }
  if (width) {
    otherStyle.push({ width: width });
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
          <MenuTrigger style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: colors.heading,
                fontFamily: GlobalFonts.bold,
                fontSize: responsiveFontSize(22),
              }}
            >
              {selectedType == 1 ? 'mg/dl' : 'mmol/L'}
            </Text>

            <MaterialCommunityIcons
              name="chevron-down"
              size={responsiveFontSize(28)}
              color={colors.darkPrimary}
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.popupMenu}>
            <Pressable
              onPress={() => {
                setSelectedType(1);
                selectedType != 1 &&
                  setValue((value * 18).toFixed(1).toString());
                menuRef.current.close();
              }}
              style={[
                styles.singleMenuItem,
                selectedType == 1 ? { backgroundColor: colors.gray } : {},
              ]}
            >
              <Text style={styles.menuText}>mg/dl</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedType(21);
                selectedType != 21 &&
                  setValue((value / 18).toFixed(1).toString());
                menuRef.current.close();
              }}
              style={[
                styles.singleMenuItem,
                selectedType == 21 ? { backgroundColor: colors.gray } : {},
              ]}
            >
              <Text style={styles.menuText}>mmol/L</Text>
            </Pressable>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default BloodSugarChooser;
