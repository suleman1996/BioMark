import { View } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';

import GraphHeader from '../../../../../../components/graph-header/index';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  const [headerValue] = React.useState([
    { id: 0, title: '1D', complete: '1 Day' },
    { id: 1, title: '7D', complete: '7 Days' },
    { id: 2, title: '1M', complete: '1 Month' },
    { id: 3, title: '3M', complete: '3 Months' },
    { id: 4, title: '1Y', complete: '1 Year' },
    { id: 5, title: 'All', complete: 'All' },
  ]);
  const [selectedValue, setSelectedValue] = React.useState({
    id: 0,
    title: '1D',
    complete: '1 Day',
  });
  return (
    <View style={styles.container}>
      <GraphHeader
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        data={headerValue}
      />
    </View>
  );
};

export default Index;
