import { View } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';

import GraphHeader from '../../../../../../components/graph-header/index';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  const [headerValue] = React.useState([
    { id: 0, title: '1M', complete: '1 Month' },
    { id: 1, title: '3M', complete: '3 Months' },
    { id: 2, title: '1Y', complete: '1 Year' },
    { id: 3, title: 'All', complete: 'All' },
  ]);
  const [selectedValue, setSelectedValue] = React.useState({
    id: 0,
    title: '1M',
    complete: '1 Month',
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
