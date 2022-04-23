import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Keyboard,
} from 'react-native';
import React, {useRef} from 'react';
import SearchBarLeftIcon from '../../svg/searchBarLeftIcon';
import {GlobalColors} from '../../../utils/theme/globalColors';
import {
  heightToDp,
  widthToDp,
} from '../../../utils/functions/responsiveDimentions';
import {GlobalFonts} from '../../../utils/theme/fonts';
import {responsiveFontSize} from '../../../utils/functions/responsiveText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyImage from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import Button from '../../button/button';
import * as Yup from 'yup';
import Text_Input from '../../input-field/text-input';
import {Formik} from 'formik';
import {inputBarcode} from '../../../services/auth-service';
import ActivityIndicator from '../../loader/activity-indicator';
import {showMessage, hideMessage} from 'react-native-flash-message';
//PopUp Modal
const QrInputPopup = ({visible, children, loading}) => {
  const [showModal, setShowModal] = React.useState(visible);

  React.useEffect(() => {
    togglePopUp();
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

//PopUp Error Modal
const QrInputErrPopup = ({visible, children, loading}) => {
  const [showErrModal, setShowErrModal] = React.useState(visible);

  React.useEffect(() => {
    togglePopUp();
  }, [visible]);
  const togglePopUp = () => {
    if (visible) {
      setShowErrModal(true);
    } else {
      setShowErrModal(false);
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <ActivityIndicator visible={loading} />
    </Modal>
  );
};

const SearchBarWithLeftScanIcon = () => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const menuRef = useRef();

  const QRschemma = Yup.object({
    qrInput: Yup.string()
      .required('Please type QR or Barcode.')
      .min(8, 'Invalid.'),
  });
  const handleCode = async ({qrInput}) => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const resut = await inputBarcode({
        scanner: {
          code: qrInput,
        },
      });
      console.log('bar code success API ', resut.data);
      Keyboard.dismiss();
      setVisible(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Keyboard.dismiss();
      setVisible(false);
      console.log(error.errMsg);
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

  return (
    <>
      <View style={styles.searchBar}>
        <View style={styles.leftIconView}>
          <Menu ref={menuRef}>
            <MenuTrigger
              style={{
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SearchBarLeftIcon width={5} height={5} />
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
                  onSubmit={handleCode}>
                  {({handleChange, handleSubmit, values, errors}) => (
                    <QrInputPopup loading={loading} visible={visible}>
                      <View style={{alignItems: 'center', marginBottom: 20}}>
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
                        }}>
                        This is the number below QR or Barcode.
                      </Text>
                      <Text style={styles.popUpSubHeading}>QR or Barcode</Text>
                      <View style={{width: '100%'}}>
                        <Text_Input
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
                        <View style={{marginTop: 40}}>
                          <TouchableOpacity>
                            <Button
                              disabled={false}
                              title="Save Code"
                              marginHorizontal={0.1}
                              marginVertical={0.1}
                              onPress={() => handleSubmit()}
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
                  onPress={() => setVisible(true)}>
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

const styles = StyleSheet.create({
  searchBar: {
    width: widthToDp(92),
    backgroundColor: GlobalColors.white,
    height: heightToDp(6),
    borderRadius: widthToDp(2),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  leftIconView: {
    width: widthToDp(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalColors.primaryGray,
    borderTopLeftRadius: widthToDp(2),
    borderBottomLeftRadius: widthToDp(2),
  },
  input: {
    width: widthToDp(70),
    fontSize: responsiveFontSize(22),
    fontSize: 15,
    color: '#3D3D3D',
    marginHorizontal: 10,
    fontFamily: GlobalFonts.regular,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: widthToDp(2),
  },
  popupMenu: {
    borderRadius: 8,
    flex: 1,
    width: widthToDp(43),
    marginTop: 40,
    marginLeft: -7,
  },
  singleMenuItem: {
    paddingHorizontal: widthToDp(2),
    paddingVertical: widthToDp(1),
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomColor: GlobalColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    paddingLeft: widthToDp(2),
    fontFamily: GlobalFonts.regular,
    color: '#8493AE',
    fontSize: 13,
  },
  popUpBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9,
  },
  popUpHeader: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popUpHeading: {
    fontFamily: fonts.bold,
    fontSize: 21,
    color: colors.heading,
  },
  popUpSubHeading: {
    fontFamily: fonts.extraBold,
    fontSize: 15,
    color: colors.heading,
  },
  textInput: {
    borderRadius: 8,
    padding: 10,
    // marginBottom: 40,
  },
  errorMessage: {
    marginHorizontal: 5,
    fontSize: 12,
    color: colors.danger,
  },
});