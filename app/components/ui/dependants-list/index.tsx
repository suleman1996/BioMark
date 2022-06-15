import React, { useContext, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useDispatch } from 'react-redux';

import { DeleteModal } from 'components/higher-order';
import { BioBinIcon } from 'components/svg';

import SCREENS from 'navigation/constants';
import { dependentService } from 'services/account-service/dependent-service';
import { navigate } from 'services/nav-ref';
import { getAllDependents } from 'store/account/account-actions';
import { DependentData } from 'types/api/dependent';
import { logNow } from 'utils/functions/log-binder';

import makeStyles from './styles';
import { userService } from 'services/user-service/user-service';
import AuthContext from 'utils/auth-context';

type Props = {
  data: DependentData[];
};

const DependantsList = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();
  const { data } = props;
  const authContext = useContext(AuthContext);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<any>();

  const userProfile = async () => {
    try {
      const result = await userService.getUserProfile();

      authContext.setUserData(result.data);
    } catch (error) {}
  };
  const deleteSingleDependent = () => {
    dependentService
      .deleteSingleDependentData(deleteId)
      .then(async () => {
        await dispatch(getAllDependents());
        userProfile();
      })
      .catch(() => {})
      .finally(() => {});
  };

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
              onPress={() =>
                navigate(SCREENS.EDIT_DEPENDANTS, { id: item?.id })
              }
              style={styles.editBtn}
            >
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setIsDelete(true);
                setDeleteId(item?.id);
              }}
            >
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
      <DeleteModal
        isVisible={isDelete}
        setIsVisible={setIsDelete}
        callMe={deleteSingleDependent}
        heading="Delete Dependants?"
        subHeading="Are you sure you want to delete profiles?"
      />
      {}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={singleItem}
      />
    </View>
  );
};

export default DependantsList;
