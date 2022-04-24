import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalStyles } from 'utils/theme/global-styles';
import { navigate } from 'services/nav-ref';
import { Nav_Screens } from 'navigation/constants/index';
import DeleteModalComponent from 'components/higher-order/delete-modal';

const DependantsList = () => {
  const [isDelete, setIsDelete] = useState(false);

  return (
    <View style={styles.container}>
      <DeleteModalComponent
        isVisible={isDelete}
        setIsVisible={setIsDelete}
        heading="Delete Dependants?"
        subHeading="Are you sure you want to delete profiles?"
      />
      <FlatList
        data={['1', '2', '3', '4', '5', '6', '7', '8']}
        renderItem={() => {
          return (
            <View style={styles.cardItem}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Deku Midoriya</Text>
                <View style={styles.headerEnd}>
                  <Pressable
                    onPress={() => navigate(Nav_Screens.Edit_Dependants)}
                    style={styles.editBtn}
                  >
                    <Text style={styles.editText}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => setIsDelete(true)}>
                    <AntDesign name="delete" size={responsiveFontSize(22)} />
                  </Pressable>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.relationText}>Relation: </Text>
                <Text style={styles.relationWithText}>
                  Parents / Parent's in law
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default DependantsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: widthToDp(4),
    paddingVertical: heightToDp(2),
  },
  cardItem: {
    width: widthToDp(92),
    padding: widthToDp(3),
    borderRadius: widthToDp(2),
    marginBottom: heightToDp(2),
    ...GlobalStyles.shadow2,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: responsiveFontSize(20),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
  editText: {
    fontSize: responsiveFontSize(15),
    fontFamily: GlobalFonts.regular,
    color: GlobalColors.darkPrimary,
    textDecorationLine: 'underline',
    borderBottomColor: GlobalColors.darkPrimary,
  },
  relationText: {
    fontSize: responsiveFontSize(20),
    fontFamily: GlobalFonts.medium,
    color: GlobalColors.darkPrimary,
  },
  relationWithText: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.light,
    color: GlobalColors.darkPrimary,
  },
  headerEnd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: GlobalColors.primary,
    borderRadius: widthToDp(3),
    paddingHorizontal: widthToDp(3),
    marginRight: widthToDp(2),
    height: heightToDp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
