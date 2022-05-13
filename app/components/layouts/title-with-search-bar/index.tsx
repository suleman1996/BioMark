import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { SearchBarWithLeftScanIcon } from 'components/higher-order';

import { styles } from './styles';

type Props = {
  children: any;
  title: string;
};

const TitleWithSearchBarLayout = ({ children, title }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <View style={styles.halfPrimary} />
        <SearchBarWithLeftScanIcon />
      </View>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default TitleWithSearchBarLayout;
