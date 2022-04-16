import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, { useRef } from 'react'
import SearchBarLeftIcon from '../../svg/searchBarLeftIcon';
import { GlobalColors } from '../../../utils/theme/globalColors';
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions';
import { GlobalFonts } from '../../../utils/theme/fonts';
import { responsiveFontSize } from '../../../utils/functions/responsiveText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyImage from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import { Button } from 'react-native-paper';

const QrInputPopup = ({ visible, children }) => {
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
  }
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.popUpBackground}>
        <View style={styles.popUpContainer}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const SearchBarWithLeftScanIcon = () => {

  const [visible, setVisible] = React.useState(false);

  const menuRef = useRef();
  return (
    <>
      <View style={styles.searchBar}>
        <View style={styles.leftIconView}>
          <Menu ref={menuRef}>
            <MenuTrigger>
              <SearchBarLeftIcon width={6} height={6} />
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
                <QrInputPopup visible={visible}>
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.popUpHeader}>
                      <TouchableOpacity onPress={() => setVisible(false)}>
                        <Image source={MyImage.closeIcon}
                          style={{
                            height: 15,
                            width: 15,
                          }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </QrInputPopup>
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={responsiveFontSize(22)}
                  color={GlobalColors.primary}
                  onPress={() => setVisible(true)}
                />
                <Text style={styles.menuText} fontSize={responsiveFontSize(15)}>
                  Input Barcode
                </Text>

              </TouchableOpacity>
              <TouchableOpacity style={styles.singleMenuItem}>
                <MaterialCommunityIcons
                  name="upload"
                  size={responsiveFontSize(22)}
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
}

export default SearchBarWithLeftScanIcon

const styles = StyleSheet.create({
  searchBar: {
    width: widthToDp(92),
    backgroundColor: GlobalColors.white,
    height: heightToDp(6),
    borderRadius: widthToDp(2),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
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
    borderRadius: widthToDp(3),
    flex: 1,
    width: widthToDp(45),
    padding: widthToDp(1),
    marginTop: 30,

  },
  singleMenuItem: {
    paddingHorizontal: widthToDp(3),
    paddingVertical: widthToDp(1),
    flexDirection: 'row',
    alignItems: 'center'
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
    paddingVertical: 30,
    borderRadius: 9,
  },
  popUpHeader: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

});