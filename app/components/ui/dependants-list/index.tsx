import DeleteModalComponent from 'components/higher-order/delete-modal';
import BioBinIcon from 'components/svg/bio-bin-icon';
import { Nav_Screens } from 'navigation/constants/index';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { navigate } from 'services/nav-ref';
import { DependentData } from 'types/api/dependent';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalStyles } from 'utils/theme/global-styles';

type Props = {
  data: DependentData[];
};

const DependantsList = (props: Props) => {
  const { data } = props;
  const [isDelete, setIsDelete] = useState(false);

  const singleItem = ({ item }: { item: DependentData }) => {
    const {
      name = '',
      relation = '',
      id = '',
    } = {
      name: item?.name,
      relation: item?.type,
      id: item?.id,
    };
    logNow(id);
    return (
      <View style={styles.cardItem}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{name}</Text>
          <View style={styles.headerEnd}>
            <Pressable
              onPress={() => navigate(Nav_Screens.Edit_Dependants)}
              style={styles.editBtn}
            >
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => setIsDelete(true)}>
              <BioBinIcon width={5} height={5} />
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.relationText}>Relation: </Text>
          <Text style={styles.relationWithText}>{relation}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DeleteModalComponent
        isVisible={isDelete}
        setIsVisible={setIsDelete}
        heading="Delete Dependants?"
        subHeading="Are you sure you want to delete profiles?"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={singleItem}
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
    backgroundColor: GlobalColors.white,
    ...GlobalStyles.shadow,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: responsiveFontSize(20),
    fontFamily: GlobalFonts.bold,
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
    fontFamily: GlobalFonts.bold,
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
