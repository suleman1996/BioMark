import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { endocrineData1Day, endocrineData7Days } from '../data';

type Props = {
  display7Days: Boolean;
};

const Endocrine = (props: Props) => {
  const { display7Days } = props;

  return (
    <View style={{ marginTop: 50 }}>
      <BarChart
        data={display7Days ? endocrineData7Days : endocrineData1Day}
        hideRules
        barMarginBottom={10}
        barWidth={15}
        barBorderRadius={10}
        xAxisLabelTextStyle={{ fontSize: 10, color: '#8493AE' }}
      />
    </View>
  );
};

export default Endocrine;
