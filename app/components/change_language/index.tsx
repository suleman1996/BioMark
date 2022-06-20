/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

// import { navigate } from 'services/nav-ref';

const ChangeLanguage = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = useRef<any>();

  const menuStyle = {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <>
      <View style={[styles.leftIconView]}>
        <Menu
          onOpen={() => setIsMenuOpen(true)}
          onClose={() => setIsMenuOpen(false)}
          ref={menuRef}
        >
          <MenuTrigger styles={menuStyle}>
            <Text style={styles.languageIcon}>EN</Text>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.popupMenu}>
            <View style={styles.optionIcon}>
              <Text style={styles.optionsHeading}>Change Language</Text>
            </View>
            <MenuOption
              onSelect={() => alert(`english`)}
              style={styles.singleMenuItem}
            >
              <>
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  English
                </Text>
              </>
            </MenuOption>
            <MenuOption
              onSelect={() => alert(`Bahasa Indonesia`)}
              style={styles.singleMenuItem}
            >
              <>
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  Bahasa Indonesia
                </Text>
              </>
            </MenuOption>
            <MenuOption
              onSelect={() => alert(`Bahasa Malaysia`)}
              style={styles.singleMenuItem}
            >
              <>
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  Bahasa Malaysia
                </Text>
              </>
            </MenuOption>
            <MenuOption
              onSelect={() => alert(`Chinese`)}
              style={styles.singleMenuItem}
            >
              <>
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  Chinese
                </Text>
              </>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </>
  );
};

export default ChangeLanguage;
