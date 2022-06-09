/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import Fontisto from 'react-native-vector-icons/Fontisto';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { userService } from 'services/user-service/user-service';
import SCREENS from 'navigation/constants';

import { SearchBarLeftIcon } from 'components/svg';
import { ActivityIndicator } from 'components';
import { Button } from 'components/button';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import MyImage from 'assets/images';
import fonts from 'assets/fonts';

import makeStyles from './styles';
import { navigate } from 'services/nav-ref';
import { showMessage } from 'react-native-flash-message';
// import { navigate } from 'services/nav-ref';

const SearchBarWithLeftScanIcon = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [code, setCode] = React.useState('');

  const menuRef = useRef<any>();

  const handleCode = async () => {
    try {
      console.log(code, '---------------------');
      const response = await userService.barcodeCheck({
        scanner: {
          code: code,
        },
      });
      navigate(SCREENS.SUPPORT_SYSTEM);
      console.log(response, 'codee---------------code------------------');
      // navigate(Screeb, {
      //   SHOW_DEMO: true
      // })
    } catch (err) {
      showMessage({
        message: err.errMsg.data.message,
        type: 'danger',
      });
      console.log(err, 'errrr-codeeee---------------');
    }
  };

  console.log(code);

  const bgColor = isMenuOpen
    ? { backgroundColor: colors.primary }
    : { backgroundColor: colors.white };

  const menuStyle = {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <>
      <View style={styles.searchBar}>
        <View style={[styles.leftIconView, bgColor]}>
          <Menu
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => setIsMenuOpen(false)}
            ref={menuRef}
          >
            <MenuTrigger styles={menuStyle}>
              <SearchBarLeftIcon
                width={5}
                height={5}
                fill={isMenuOpen ? colors.white : colors.primary}
              />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.popupMenu}>
              <TouchableOpacity style={styles.singleMenuItem}>
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={responsiveFontSize(22)}
                  color={colors.primary}
                />
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  Scan QR/Barcode
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.singleMenuItem}>
                <QrInputPopup loading={loading} visible={visible}>
                  <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <View style={styles.popUpHeader}>
                      <Text style={styles.popUpHeading}>
                        Input QR or Barcode
                      </Text>
                      <TouchableOpacity onPress={() => setVisible(false)}>
                        <Image
                          source={MyImage.closeIcon}
                          style={{
                            height: 15,
                            width: 15,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      fontSize: 17,
                      color: '#8493AE',
                    }}
                  >
                    This is the number below QR or Barcode.
                  </Text>
                  <Text style={styles.popUpSubHeading}>QR or Barcode</Text>
                  <View style={{ width: '100%' }}>
                    <TextInput
                      value={code}
                      backgroundColor={colors.inputBg}
                      style={styles.textInput}
                      marginTop={10}
                      // onChangeText={handleChange}
                      onChangeText={(e) => setCode(e)}
                      // onChange={handleChange('qrInput')}
                    />
                    <View style={{ marginTop: 40 }}>
                      <TouchableOpacity>
                        <Button
                          onPress={() => {
                            setVisible(false);
                            setIsMenuOpen(false);
                            handleCode();
                          }}
                          title="Save Code"
                          marginHorizontal={0.1}
                          marginVertical={0.1}
                          disabled={false}
                          // onChange={handleChange('qrInput')}
                          // disabled={!isValid && errors}
                          // disabled={!isValid && errors ? true : false}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </QrInputPopup>
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={responsiveFontSize(22)}
                  color={colors.primary}
                />
                <Text
                  style={styles.menuText}
                  fontSize={responsiveFontSize(15)}
                  onPress={() => setVisible(true)}
                >
                  Input Barcode
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.singleMenuItem}>
                <MaterialCommunityIcons
                  name="upload"
                  size={responsiveFontSize(25)}
                  color={colors.primary}
                />
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  Upload Results
                </Text>
              </TouchableOpacity>
            </MenuOptions>
          </Menu>
        </View>

        <View style={styles.inputContainer}>
          <Fontisto
            name="search"
            size={responsiveFontSize(22)}
            color={colors.primary}
          />
          <TextInput
            textAlignVertical="center"
            style={styles.input}
            placeholder="Search Biomark app"
            placeholderStyle={styles.input}
            autoFocus={false}
            text
          />
        </View>
      </View>
    </>
  );
};

export default SearchBarWithLeftScanIcon;

type Props = {
  visible: Boolean;
  children: any;
  loading: Boolean;
};

//PopUp Modal
const QrInputPopup = ({ visible, children, loading }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [showModal, setShowModal] = React.useState(visible);

  React.useEffect(() => {
    togglePopUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const togglePopUp = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <ActivityIndicator visible={loading} />
      <View style={styles.popUpBackground}>
        <View style={styles.popUpContainer}>{children}</View>
      </View>
    </Modal>
  );
};
