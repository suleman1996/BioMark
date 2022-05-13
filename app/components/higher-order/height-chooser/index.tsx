import { Text, View, Pressable } from 'react-native';
import React, { useRef } from 'react';

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
  height: number | string;
  textAlign: string | number;
  onChangeText: (text: string) => void;
  setSelectedType: any;
  selectedType: any;
  value: string;
  setValue: any;
};

const HeightChooserComponent = ({
  label,
  placeholder,
  height,
  textAlign,
  onChangeText,
  setSelectedType,
  selectedType,
  value,
  setValue,
}: Props) => {
  const menuRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [value, setValue] = useState(0);
  // const [selectedType, setSelectedType] = useState(2);

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
                selectedType != 1 &&
                  setValue((value / 2.54).toFixed(3).toString());
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
                selectedType != 2 &&
                  setValue(parseInt(value * 2.54).toString());
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
