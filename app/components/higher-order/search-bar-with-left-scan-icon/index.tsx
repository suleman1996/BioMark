import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Keyboard,
} from 'react-native';
import React, { useRef } from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';

import { SearchBarLeftIcon } from 'components/svg';
import { GlobalColors } from 'utils/theme/global-colors';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import MyImage from 'assets/images';
import colors from 'assets/colors';
import fonts from 'assets/fonts';
import { Button } from 'components/button';
import { inputBarcode } from 'services/auth-service';
import { ActivityIndicator } from 'components';
import { styles } from './styles';

type Props = {
  visible: Boolean;
  children: any;
  loading: Boolean;
};

//PopUp Modal
const QrInputPopup = ({ visible, children, loading }: Props) => {
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

const SearchBarWithLeftScanIcon = () => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuRef = useRef<any>();

  const QRschemma = Yup.object({
    qrInput: Yup.string()
      .required('Please type QR or Barcode.')
      .min(8, 'Invalid.'),
  });
  const handleCode = async ({ qrInput }: any) => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      await inputBarcode({
        scanner: {
          code: qrInput,
        },
      });
      Keyboard.dismiss();
      setVisible(false);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Keyboard.dismiss();
      setVisible(false);
      if (error.errMsg.status == '500') {
        showMessage({
          message: "User not exist's",
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const bgColor = isMenuOpen
    ? { backgroundColor: GlobalColors.primary }
    : { backgroundColor: GlobalColors.white };
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
                fill={isMenuOpen ? GlobalColors.white : GlobalColors.primary}
              />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.popupMenu}>
              <TouchableOpacity style={styles.singleMenuItem}>
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.primary}
                />
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  Scan QR/Barcode
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.singleMenuItem}>
                {/* popup Modal */}
                <Formik
                  initialValues={{
                    qrInput: '',
                  }}
                  validationSchema={QRschemma}
                  onSubmit={handleCode}
                >
                  {({ handleChange, handleSubmit, errors, isValid }) => (
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
                          backgroundColor={colors.inputBg}
                          style={styles.textInput}
                          marginTop={10}
                          onChange={handleChange('qrInput')}
                        />
                        {errors.qrInput && (
                          <Text style={styles.errorMessage}>
                            {errors.qrInput}
                          </Text>
                        )}
                        <View style={{ marginTop: 40 }}>
                          <TouchableOpacity>
                            <Button
                              onPress={() => handleSubmit()}
                              title="Save Code"
                              marginHorizontal={0.1}
                              marginVertical={0.1}
                              onChange={handleChange('qrInput')}
                              disabled={!isValid && errors}
                              // disabled={!isValid && errors ? true : false}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </QrInputPopup>
                  )}
                </Formik>

                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.primary}
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
                  color={GlobalColors.primary}
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
            color={GlobalColors.primary}
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
