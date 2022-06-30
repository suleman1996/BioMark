import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { cardiacData1Day, cardiacData7Days } from '../data';

type Props = {
  display7Days: Boolean;
};

const Cardiac = (props: Props) => {
  const { display7Days } = props;

  return (
    <View style={{ marginTop: 50 }}>
      <BarChart
        data={display7Days ? cardiacData7Days : cardiacData1Day}
        hideRules
        barMarginBottom={10}
        barWidth={15}
        barBorderRadius={10}
        xAxisLabelTextStyle={{ fontSize: 10, color: '#8493AE' }}
      />
    </View>
  );
};

export default Cardiac;
