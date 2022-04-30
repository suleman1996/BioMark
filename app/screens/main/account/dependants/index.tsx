import ButtonComponent from 'components/base/button';
import DependantsList from 'components/ui/dependants-list';
import { Nav_Screens } from 'navigation/constants/index';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'services/nav-ref';
import { getAllDependents } from 'store/account/account-actions';
import { IAppState } from 'store/IAppState';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';

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
