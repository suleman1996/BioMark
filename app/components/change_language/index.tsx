/* eslint-disable @typescript-eslint/no-unused-vars */
import i18next from 'i18next';
import React, { useContext, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { profileServices } from 'services/profile-services';
import { userService } from 'services/user-service/user-service';
import AuthContext from 'utils/auth-context';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

const ChangeLanguage = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const authContext = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = useRef<any>();

  const menuStyle = {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  };
  const languageSubmited = async (lang) => {
    try {
      const response = await userService.setLanguage(lang);
      userProfile();
    } catch (err) {
      console.error(err);
    }
  };
  const userProfile = async () => {
    try {
      const result = await profileServices.getUserProfile();
      authContext.setUserData(result);
      i18next.changeLanguage(result?.app_lang);
      await AsyncStorage.setItem('laguage', result?.app_lang);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <View style={[styles.leftIconView]}>
        <Menu
          onOpen={() => setIsMenuOpen(true)}
          onClose={() => setIsMenuOpen(false)}
          ref={menuRef}
        >
          <MenuTrigger styles={menuStyle}>
            <Text style={styles.languageIcon}>
              {authContext?.userData?.app_lang?.toUpperCase()}
            </Text>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.popupMenu}>
            <View style={styles.optionIcon}>
              <Text style={styles.optionsHeading}>Change Language</Text>
            </View>
            <MenuOption
              onSelect={
                () => languageSubmited('en')
                //  i18next.changeLanguage('en')
              }
              style={styles.singleMenuItem}
            >
              <>
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  English
                </Text>
              </>
            </MenuOption>
            <MenuOption
              onSelect={
                () => languageSubmited('id')
                //  i18next.changeLanguage('id')
              }
              style={styles.singleMenuItem}
            >
              <>
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  Bahasa Indonesia
                </Text>
              </>
            </MenuOption>
            <MenuOption
              onSelect={() => languageSubmited('my')}
              style={styles.singleMenuItem}
            >
              <>
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  Bahasa Malaysia
                </Text>
              </>
            </MenuOption>
            <MenuOption
              onSelect={() => languageSubmited('zh')}
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
