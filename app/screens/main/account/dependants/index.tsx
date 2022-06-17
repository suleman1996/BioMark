import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { Header } from 'components';
import { Button } from 'components/base';
import { DependantsList } from 'components/ui';

import { navigate } from 'services/nav-ref';
import { getAllDependents } from 'store/account/account-actions';
import { IAppState } from 'store/IAppState';
import SCREENS from 'navigation/constants';

import makeStyles from './styles';
import { DependentIcon } from 'components/svg';
import { useTheme } from 'react-native-paper';

type Props = {
  navigation: any;
};

const DependantsScreen = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const {} = props;

  const data = useSelector((state: IAppState) => state.account.allDependents);

  const hasUnsavedChanges = Boolean(true);
  const dispatch = useDispatch();

  /*eslint-disable*/
  React.useEffect(
    () =>
      props.navigation.addListener('beforeRemove', (e) => {
        // alert('hii');
      }),
    [props.navigation, hasUnsavedChanges]
  );

  useEffect(() => {
    dispatch(getAllDependents());
  }, []);
  /*eslint-enable*/

  return (
    <View style={styles.container}>
      <Header isBold={true} isColor={true} title="Dependant" />
      <View style={styles.bottomBtnContainer}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.noDependetView}>
            {data.length === 0 ? (
              <View style={styles.emptyView}>
                <DependentIcon width={20} height={20} fill={colors.primary} />
                <Text style={styles.name}>No Dependants Yet</Text>
                <Text style={styles.subHead}>
                  No dependants to see them here
                </Text>
                <Button
                  onPress={() => navigate(SCREENS.ADD_DEPENDANTS)}
                  title={'Add New Dependant'}
                />
              </View>
            ) : (
              <>
                <DependantsList data={data} />
                <Button
                  onPress={() => navigate(SCREENS.ADD_DEPENDANTS)}
                  title={'Add New Dependant'}
                />
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DependantsScreen;
