import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import colors from '../../../assets/colors';
import {
  heightToDp,
  widthToDp,
} from '../../../utils/functions/responsive-dimensions';
import { responsiveFontSize } from '../../../utils/functions/responsive-text';
import { GlobalFonts } from '../../../utils/theme/fonts';
import { GlobalColors } from '../../../utils/theme/global-colors';

type Props = {
  options?: any;
  label: string;
};

const RelationMenu = ({ options, label }: Props) => {
  const menuRef = useRef<any>();
  const [selected, setSelected] = useState();
  const selectedStyles = { backgroundColor: GlobalColors.primary };
  const selectedTextStyle = { color: GlobalColors.white };
  return (
    <View style={styles.main}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Menu ref={menuRef} onSelect={(value) => setSelected(value)}>
        <MenuTrigger
          style={styles.input}
          text={selected ? selected : 'Select'}
          placeholder="Select"
        >
          <Text>{selected}</Text>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.popupMenu}>
          <MenuOption value="Spouse" text="Spouse" />
          <MenuOption value="Child" text="Child" />
          <MenuOption value="Sibiling" text="Sibiling" />
          <MenuOption
            value="Parents / Parent's-in-law"
            text="Parents / Parent's-in-law"
          />
          <MenuOption value="Grandparents" text="Grandparents" />
          <MenuOption value="Guardian" text="Guardian" />
          <MenuOption value="Others" text="Others" />
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
