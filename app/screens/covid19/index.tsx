import BookTestButton from 'components/button/book-test';
import TestBookinButton from 'components/button/bookings';
import DependentButton from 'components/button/dependents';
import ViewResultsButton from 'components/button/view-results';
import { TitleWithSearchBarLayout } from 'components/layouts';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {};

const Covid19Home = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const horizontalListItem = () => {
    return (
      <View style={styles.horizontalListItem}>
        <Text>Deku</Text>
      </View>
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
          <FlatList
            horizontal
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={horizontalListItem}
          />
        </View>
      </TitleWithSearchBarLayout>
    </>
  );
};

export default Covid19Home;
