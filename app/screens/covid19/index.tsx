import BookTestButton from 'components/button/book-test';
import TestBookinButton from 'components/button/bookings';
import DependentButton from 'components/button/dependents';
import ViewResultsButton from 'components/button/view-results';
import { TitleWithSearchBarLayout } from 'components/layouts';
import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import makeStyles from './styles';

type Props = {};

const Covid19Home = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [selectedHorizontal, setSelectedHorizontal] = useState(0);

  const horizontalListItem = ({
    // item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    const ifST =
      selectedHorizontal === index
        ? { color: colors.darkPrimary }
        : { color: colors.inactive };
    const ifSBLine =
      selectedHorizontal === index
        ? { borderBottomWidth: 2 }
        : { borderBottomWidth: 0 };
    return (
      <TouchableRipple
        onPress={() => {
          logNow('hello');
          setSelectedHorizontal(index);
        }}
        style={[styles.horizontalListItem, ifSBLine]}
      >
        <Text style={[styles.horizontalListItemText, ifST]}>Deku</Text>
      </TouchableRipple>
    );
  };

  return (
    <>
      <TitleWithSearchBarLayout isBack title={'Covid 19'}>
        <View style={styles.container}>
          <View style={styles.badgesContainer}>
            <BookTestButton />
            <TestBookinButton />
          </View>
          <View style={styles.badgesContainer}>
            <ViewResultsButton />
            <DependentButton />
          </View>
          <View style={{ marginTop: heightToDp(2) }} />
          <FlatList
            horizontal
            ListHeaderComponent={<View style={{ width: widthToDp(10) }} />}
            ListFooterComponent={<View style={{ width: widthToDp(10) }} />}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={horizontalListItem}
          />
        </View>
      </TitleWithSearchBarLayout>
    </>
  );
};

export default Covid19Home;
