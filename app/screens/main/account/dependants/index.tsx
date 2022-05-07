import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'services/nav-ref';

import { getAllDependents } from 'store/account/account-actions';
import { IAppState } from 'store/IAppState';
import { Button } from 'components/base';
import { DependantsList } from 'components/ui';
import SCREENS from 'navigation/constants';

import { styles } from './styles';

type Props = {
  navigation: any;
};

const DependantsScreen = (props: Props) => {
  const {} = props;
  // const [data, setData] = useState<Array<DependentData>>([]);

  const data = useSelector((state: IAppState) => state.account.allDependents);

  const dispatch = useDispatch();
  /*eslint-disable*/

  useEffect(() => {
    dispatch(getAllDependents());
  }, []);
  /*eslint-enable*/
  return (
    <View style={styles.container}>
      <DependantsList data={data} />
      <View style={styles.bottomBtnContainer}>
        <Button
          onPress={() => navigate(SCREENS.ADD_DEPENDANTS)}
          title={'Add New Dependant'}
        />
      </View>
    </View>
  );
};

export default DependantsScreen;
