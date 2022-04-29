import { StyleSheet, View } from 'react-native';
import React from 'react';

import ButtonComponent from 'components/base/button';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import DependantsList from 'components/ui/dependants-list';
import { navigate } from 'services/nav-ref';
import { Nav_Screens } from 'navigation/constants/index';

const DependantsScreen = () => {
  return (
    <View style={styles.container}>
      <DependantsList />
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
