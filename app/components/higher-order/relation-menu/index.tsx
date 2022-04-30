import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

import colors from 'assets/colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

type Props = {
  label: string;
  options: any;
  onChange: any;
  optionValue: any;
};

const RelationMenu = ({ label, options, onChange, optionValue }: Props) => {
  const menuRef = useRef<any>();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(optionValue);
  }, [optionValue]);

  return (
    <View style={styles.main}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Menu
        ref={menuRef}
        onSelect={(value) => {
          setSelected(value);
          onChange(value);
        }}
      >
        <MenuTrigger
          style={styles.input}
          text={options[selected - 1]?.name}
          placeholder="Select"
        >
          <Text>
            {options[selected - 1]?.name ? options[selected - 1]?.name : label}
          </Text>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.popupMenu}>
          {options?.map((item: any, index: number) => (
            <MenuOption key={index} value={item.id} text={item?.name} />
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default RelationMenu;

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
  label: {
    fontSize: responsiveFontSize(22),
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.medium,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  popupMenu: {
    width: widthToDp(70),
  },
});
