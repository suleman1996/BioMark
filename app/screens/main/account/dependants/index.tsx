import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { Header } from 'components';
import { Button } from 'components/base';
import { DependantsList } from 'components/ui';

import { navigate } from 'services/nav-ref';
import { getAllDependents } from 'store/account/account-actions';
import { IAppState } from 'store/IAppState';
import SCREENS from 'navigation/constants';

import styles from './styles';

type Props = {
  navigation: any;
};

const DependantsScreen = (props: Props) => {
  const {} = props;

  const data = useSelector((state: IAppState) => state.account.allDependents);

  const hasUnsavedChanges = Boolean(true);
  const dispatch = useDispatch();

  /*eslint-disable*/
  React.useEffect(
    () =>
      props.navigation.addListener('beforeRemove', (e) => {
        console.log('e', e);

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
      <Header isBold={true} isColor={true} title="Dependent" />
      <View style={styles.bottomBtnContainer}>
        <ScrollView style={{ flex: 1 }}>
          <DependantsList data={data} />
          <View style={{ alignItems: 'center' }}>
            <Button
              onPress={() => navigate(SCREENS.ADD_DEPENDANTS)}
              title={'Add New Dependant'}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DependantsScreen;
