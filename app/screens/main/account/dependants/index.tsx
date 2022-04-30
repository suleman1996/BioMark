import ButtonComponent from 'components/base/button';
import DependantsList from 'components/ui/dependants-list';
import { Nav_Screens } from 'navigation/constants/index';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { dependentService } from 'services/account-service/dependent-service';
import { navigate } from 'services/nav-ref';
import { DependentData } from 'types/api/dependent';
import { ErrorResponse } from 'types/ErrorResponse';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

type Props = {
  navigation: any;
};

const DependantsScreen = (props: Props) => {
  const {} = props;
  const [data, setData] = useState<Array<DependentData>>([]);

  const getAllDependents = () => {
    dependentService
      .getAllDependents()
      .then((res) => {
        logNow(res);
        setData(res);
      })
      .catch((err: ErrorResponse) => {
        logNow(err);
      });
  };

  useEffect(() => {
    getAllDependents();
  }, []);

  return (
    <View style={styles.container}>
      <DependantsList data={data} />
      <View style={styles.bottomBtnContainer}>
        <ButtonComponent
          onPress={() => navigate(Nav_Screens.Add_Dependants)}
          title={'Add New Dependant'}
        />
      </View>
    </View>
  );
};

export default DependantsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    paddingBottom: heightToDp(3),
    width: widthToDp(100),
    paddingHorizontal: widthToDp(6),
  },
});
