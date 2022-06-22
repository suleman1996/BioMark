/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Entypo from 'react-native-vector-icons/Entypo';

import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { userService } from 'services/user-service/user-service';
import SCREENS from 'navigation/constants';

import { SearchBarLeftIcon } from 'components/svg';
import { ActivityIndicator } from 'components';
import { Button } from 'components/button';
import { healthRiskData } from '../../../screens/main/home-page/health-risk/list-data';
import { healthRisksColor } from 'utils/functions/your-health';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import MyImage from 'assets/images';
import fonts from 'assets/fonts';

import makeStyles from './styles';
import { navigate } from 'services/nav-ref';
import { showMessage } from 'react-native-flash-message';
import WithdrawProgram from 'components/widthdraw-from-program';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { getHealthTrackerRisks } from 'store/home/home-actions';
// import { navigate } from 'services/nav-ref';

const SearchBarWithLeftScanIcon = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);
  const [showModalQr, setShowModalQr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [invalidError, setInvalidError] = React.useState('');
  const [actionError, setActionError] = React.useState('');

  const menuRef = useRef<any>();

  const [searchText, setSearchText] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);
  const healthRisk = useSelector((state: IAppState) => state.home.healthRisks);

  useEffect(() => {
    dispatch(getHealthTrackerRisks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let arr = [
    {
      name: 'Heart Disease',
      screen: SCREENS.HEALTH_RISK,
      params: {
        item: healthRisk['heart'],
        cardData: healthRiskData['heart'].disease,
        refData: healthRiskData['heart'].refrence,
        footNotesData: healthRiskData['heart'].footnotes,
        calc: healthRiskData['heart'].calculations,
        clr: healthRisksColor(colors, healthRisk['heart']?.status),
        SVG: healthRiskData['heart'].icon,
      },
    },
    {
      name: 'Diabetes',
      screen: SCREENS.HEALTH_RISK,
      params: {
        item: healthRisk['diabetes'],
        cardData: healthRiskData['diabetes'].disease,
        refData: healthRiskData['diabetes'].refrence,
        footNotesData: healthRiskData['diabetes'].footnotes,
        calc: healthRiskData['diabetes'].calculations,
        clr: healthRisksColor(colors, healthRisk['diabetes']?.status),
        SVG: healthRiskData['diabetes'].icon,
      },
    },
    {
      name: 'Boold Pressure',
      screen: SCREENS.HEALTH_RISK,
      params: {
        item: healthRisk['bp'],
        cardData: healthRiskData['bp'].disease,
        refData: healthRiskData['bp'].refrence,
        footNotesData: healthRiskData['bp'].footnotes,
        calc: healthRiskData['bp'].calculations,
        clr: healthRisksColor(colors, healthRisk['bp']?.status),
        SVG: healthRiskData['bp'].icon,
      },
    },
    {
      name: 'BMI',
      screen: SCREENS.HEALTH_RISK,
      params: {
        item: healthRisk['bmi'],
        cardData: healthRiskData['bmi'].disease,
        refData: healthRiskData['bmi'].refrence,
        footNotesData: healthRiskData['bmi'].footnotes,
        calc: healthRiskData['bmi'].calculations,
        clr: healthRisksColor(colors, healthRisk['bmi']?.status),
        SVG: healthRiskData['bmi'].icon,
      },
    },
    {
      name: 'Smoking',
      screen: SCREENS.HEALTH_RISK,
      params: {
        item: healthRisk['smoking'],
        cardData: healthRiskData['smoking'].disease,
        refData: healthRiskData['smoking'].refrence,
        footNotesData: healthRiskData['smoking'].footnotes,
        calc: healthRiskData['smoking'].calculations,
        clr: healthRisksColor(colors, healthRisk['smoking']?.status),
        SVG: healthRiskData['smoking'].icon,
      },
    },
    {
      name: 'Drinking',
      screen: SCREENS.HEALTH_RISK,
      params: {
        item: healthRisk['drinking'],
        cardData: healthRiskData['drinking'].disease,
        refData: healthRiskData['drinking'].refrence,
        footNotesData: healthRiskData['drinking'].footnotes,
        calc: healthRiskData['drinking'].calculations,
        clr: healthRisksColor(colors, healthRisk['drinking']?.status),
        SVG: healthRiskData['drinking'].icon,
      },
    },
    {
      name: 'Sleeping',
      screen: SCREENS.HEALTH_RISK,
      params: {
        item: healthRisk['sleeping'],
        cardData: healthRiskData['sleeping'].disease,
        refData: healthRiskData['sleeping'].refrence,
        footNotesData: healthRiskData['sleeping'].footnotes,
        calc: healthRiskData['sleeping'].calculations,
        clr: healthRisksColor(colors, healthRisk['sleeping']?.status),
        SVG: healthRiskData['sleeping'].icon,
      },
    },
    {
      name: 'Stress',
      screen: SCREENS.HEALTH_RISK,
      params: {
        item: healthRisk['stress'],
        cardData: healthRiskData['stress'].disease,
        refData: healthRiskData['stress'].refrence,
        footNotesData: healthRiskData['stress'].footnotes,
        calc: healthRiskData['stress'].calculations,
        clr: healthRisksColor(colors, healthRisk['stress']?.status),
        SVG: healthRiskData['stress'].icon,
      },
    },
    {
      name: 'Heart Records',
      screen: SCREENS.HEALTH_RECORD,
    },

    {
      name: 'Blood Pressure',
      screen: SCREENS.BLOOD_PRESSURE,
    },
    {
      name: 'BMI',
      screen: SCREENS.BODY_MEASUREMENT,
    },
    {
      name: 'Smoking',
      screen: SCREENS.SMOKING,
    },
    {
      name: 'Drinking',
      screen: SCREENS.DRINKING,
    },
    {
      name: 'Stress',
      screen: SCREENS.STRESS,
    },
    {
      name: 'Sleeping',
      screen: SCREENS.SLEEP,
    },
  ];

  const searchResult = (search) => {
    // try {
    //   const result = await userService.getSearchResult(5574, search);
    //   console.log('result.data.results', result.data.results);

    //   setSearchData(result.data.results);
    // } catch (error) {
    //   console.log('error ', error);
    // }
    const filteredData = arr.filter((ele) => {
      console.log('ele', ele);

      let itemLowercase = ele.name.toLowerCase();

      let searchTermLowercase = search.toLowerCase();

      return itemLowercase.indexOf(searchTermLowercase) > -1;
    });
    setSearchData(filteredData);
    // this.setState({ DataAdapter: filteredContacts });
  };
  const RenderSearch = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(SCREENS.MORE_INFO, {
          result_id: item?.biomarker_id,
        })
      }
      style={styles.renderSearchView}
    >
      <Text style={{ fontFamily: fonts.regular, fontSize: 14 }}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
  const onSuccess = (e) => {
    console.log('ettt', e.data);
    setCode('');
    handleCode(e.data);
  };
  const handleCode = async (codeFromQr) => {
    try {
      const response = await userService.barcodeCheck({
        scanner: {
          code: code || codeFromQr,
          terms: 'true',
        },
      });
      if (response.status == true) {
        navigate(SCREENS.SUPPORT_SYSTEM);
        console.log(response, 'codee---------------code------------------');
      } else {
        console.log('error', response);
      }
    } catch (err) {
      console.log('err', err);

      setShowModalQr(false);
      setInvalidError(err.errMsg.data.message);
      setActionError(err.errMsg.data.action);
      setModalVisible(true);
    }
  };

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
              <MenuOption
                onSelect={() => setShowModalQr(true)}
                style={styles.singleMenuItem}
              >
                <>
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={responsiveFontSize(22)}
                    color={colors.primary}
                  />
                  <Text
                    style={styles.menuText}
                    fontSize={responsiveFontSize(15)}
                  >
                    Scan QR/Barcode
                  </Text>
                </>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  setIsMenuOpen(false);
                  setVisible(true);
                }}
                style={styles.singleMenuItem}
              >
                <>
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={responsiveFontSize(22)}
                    color={colors.primary}
                  />
                  <Text
                    style={styles.menuText}
                    fontSize={responsiveFontSize(15)}
                  >
                    Input Barcode
                  </Text>
                </>
              </MenuOption>
              <MenuOption
                onSelect={() => navigate(SCREENS.RESULT_UPLOAD)}
                style={styles.singleMenuItem}
              >
                <>
                  <MaterialCommunityIcons
                    name="upload"
                    size={responsiveFontSize(25)}
                    color={colors.primary}
                  />
                  <Text
                    style={styles.menuText}
                    fontSize={responsiveFontSize(15)}
                  >
                    Upload Results
                  </Text>
                </>
              </MenuOption>
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
            onChangeText={(item) => {
              console.log('item', item);

              setSearchText(item);
              searchResult(item);
            }}
            textAlignVertical="center"
            style={styles.input}
            placeholder="Search Biomark app"
            placeholderStyle={styles.input}
            autoFocus={false}
            text
          />
        </View>
        <View
          style={[
            styles.viewDropDown,
            { maxHeight: searchText ? heightToDp(23) : null },
          ]}
        >
          <ScrollView>
            {searchText !== '' &&
              searchData?.map((item) => (
                <Pressable
                  onPress={() => {
                    if (item?.params) {
                      navigate(item?.screen, item?.params);
                    } else {
                      navigate(item?.screen);
                    }
                  }}
                  style={styles.renderSearchView}
                >
                  {console.log('item', item.screen)}
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: colors.inactive,
                        fontSize: 18,
                        paddingLeft: 10,
                      }}
                    >
                      {item?.name}
                    </Text>
                    <View style={styles.line} />
                  </View>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      </View>
      <WithdrawProgram
        text={
          invalidError == 'Invalid code'
            ? 'Manually Enter Code'
            : invalidError == 'Already a member'
            ? 'Back'
            : actionError == 'sfi_member'
            ? 'Already a Member'
            : invalidError == 'Code already used'
            ? 'Already a Member'
            : 'Back'
        }
        visible={modalVisible}
        title={
          invalidError == 'Invalid code'
            ? 'Invalid Code'
            : actionError == 'sfi_member'
            ? 'Already a Member'
            : invalidError == 'Code already used'
            ? 'Already a Member'
            : undefined
        }
        text2={
          invalidError == 'Invalid code'
            ? 'Multiple invalid code entries detected.Try manually entering the code.'
            : actionError == 'sfi_member'
            ? 'It seems like this code has already been entered.'
            : invalidError == 'Code already used'
            ? 'You are already a member of the Empower Program.You can already log your blood sugar and medications.'
            : undefined
        }
        closeModal={() => {
          setModalVisible(false) || setCode('');
        }}
        color={['#1B96D8', '#1B96D8']}
        onPress={() => {
          invalidError == 'Invalid code'
            ? setModalVisible(false) || setCode('') || setVisible(true)
            : invalidError == 'Code already used'
            ? setModalVisible(false)
            : actionError == 'sfi_member'
            ? setModalVisible(false)
            : undefined;
        }}
      />
      <QrScannerPopup loading={loading} visible={showModalQr}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: Dimensions.get('window').width,
            position: 'absolute',
            top: 20,
            right: 15,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
          onPress={() => setShowModalQr(false)}
        >
          <Entypo color={'gray'} name="flash" size={25} />
        </TouchableOpacity>
        <QRCodeScanner
          onRead={onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            width: Dimensions.get('window').width,
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setShowModalQr(false)}
        >
          <Text style={{ padding: 16 }}>Cancel</Text>
        </TouchableOpacity>
      </QrScannerPopup>
      <QrInputPopup loading={loading} visible={visible}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <View style={styles.popUpHeader}>
            <Text style={styles.popUpHeading}>Input QR or Barcode</Text>
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
            <Button
              onPress={() => {
                setVisible(false);
                handleCode();
              }}
              title="Save Code"
              marginHorizontal={0.1}
              marginVertical={0.1}
              disabled={!code ? true : false}
              // onChange={handleChange('qrInput')}
              // disabled={!isValid && errors}
              // disabled={!isValid && errors ? true : false}
            />
          </View>
        </View>
      </QrInputPopup>
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

const QrScannerPopup = ({ visible, children, loading }: Props) => {
  const { colors } = useTheme();
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
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </Modal>
  );
};
